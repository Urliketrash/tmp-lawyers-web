import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user from Authorization Header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch email_to from site_settings (similar to contact route)
    let toEmail = process.env.RESEND_TO_EMAIL || "tmp@tmplawyers.com";
    try {
      const { data: dbSettings } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "email_to")
        .single();
      if (dbSettings?.value) {
        toEmail = dbSettings.value;
      }
    } catch (dbErr) {
      console.warn("Failed to fetch dynamic email_to from database site_settings:", dbErr);
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "inquiry@tmplawyers.com";

    // 3. Send test email via Resend
    const { data, error: sendError } = await resend.emails.send({
      from: `TMP Law Firm System <${fromEmail}>`,
      to: [toEmail],
      subject: `[TEST EMAIL] Verifikasi Koneksi Email Server`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; color: #1f2937;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #c5a059; margin-bottom: 5px; font-style: italic;">TMP Law Firm & Partners</h2>
            <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0;">Sistem Pengujian</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <h3 style="color: #111827; margin-top: 0;">Halo Administrator,</h3>
          <p style="font-size: 14px; line-height: 1.6;">Email ini adalah pesan otomatis untuk memverifikasi bahwa integrasi server email (Resend API) dengan sistem CMS website <strong>tmplawyers.com</strong> telah berfungsi dengan sukses.</p>
          <div style="background-color: #f9fafb; border-left: 4px solid #c5a059; padding: 15px; margin: 20px 0; border-radius: 0 4px 4px 0;">
            <p style="font-size: 13px; margin: 0 0 8px 0; color: #4b5563;"><strong>Rincian Tes Koneksi:</strong></p>
            <p style="font-size: 13px; margin: 0 0 5px 0;"><strong>Alamat Penerima:</strong> ${toEmail}</p>
            <p style="font-size: 13px; margin: 0 0 5px 0;"><strong>Pengirim Resmi:</strong> ${fromEmail}</p>
            <p style="font-size: 13px; margin: 0;"><strong>Waktu Pengujian:</strong> ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB</p>
          </div>
          <p style="font-size: 14px; line-height: 1.6;">Tidak perlu membalas email ini. Koneksi integrasi formulir kontak Anda siap digunakan!</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;">&copy; 2026 Tao Manullang & Partners. Autentikasi Pengirim Keamanan Aktif.</p>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend Test Error:", sendError);
      return NextResponse.json({ error: sendError.message || "Gagal mengirim email tes." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("Test email submission error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
