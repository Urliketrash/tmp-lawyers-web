import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/news';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 5;

/**
 * Checks if the request should be rate-limited based on client IP.
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, [now]);
    return false;
  }

  const timestamps = rateLimitStore.get(ip) || [];
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  recentTimestamps.push(now);
  rateLimitStore.set(ip, recentTimestamps);
  return false;
}

/**
 * API route to handle public consultation inquiries using Resend.
 * Validates request input and implements basic rate-limiting to prevent spam.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get Client IP for Rate Limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi setelah 1 menit.' },
        { status: 429 }
      );
    }

    // 2. Validate input schema
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Input tidak valid', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'inquiry@tmplawyers.com';
    const toEmail = process.env.RESEND_TO_EMAIL || 'tmp@tmplawyers.com';

    // 3. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `TMP Law Firm Inquiry <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Konsultasi Hukum Baru dari ${name}`,
      html: `
        <h3>Konsultasi Hukum Baru</h3>
        <p><strong>Nama Lengkap:</strong> ${name}</p>
        <p><strong>Alamat Email:</strong> ${email}</p>
        <br />
        <p><strong>Pesan:</strong></p>
        <p style="white-space: pre-wrap; font-size: 14px; color: #333; line-height: 1.6; background: #f9f9f9; padding: 15px; border-left: 4px solid #c5a059;">${message}</p>
      `,
    });

    if (error) {
      console.error('Resend Error details:', error);
      return NextResponse.json({ error: 'Gagal mengirim email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Contact submission error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
