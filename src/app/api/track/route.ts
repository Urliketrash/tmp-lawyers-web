import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 30; // Max 30 pageviews per minute per IP

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
 * POST /api/track
 * Logs site visitor metrics (IP, Device, OS, Browser, Path, Referrer) into Supabase.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Extract IP Address (Check Cloudflare first)
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Rate limiting check to prevent DDoS and spamming database storage
    if (checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    // 2. Parse User-Agent
    const ua = request.headers.get("user-agent") || "";
    let deviceType = "Desktop";
    if (/mobile/i.test(ua)) {
      deviceType = "Mobile";
    } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
      deviceType = "Tablet";
    }

    let os = "Unknown OS";
    if (/windows/i.test(ua)) os = "Windows";
    else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
    else if (/android/i.test(ua)) os = "Android";
    else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
    else if (/linux/i.test(ua)) os = "Linux";

    let browser = "Unknown Browser";
    if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
      browser = "Chrome";
    } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
      browser = "Safari";
    } else if (/firefox|iceweasel/i.test(ua)) {
      browser = "Firefox";
    } else if (/edge|edg/i.test(ua)) {
      browser = "Edge";
    } else if (/opera|opr/i.test(ua)) {
      browser = "Opera";
    }

    // Parse Device Brand / Model name
    let deviceBrand = "Desktop PC";
    if (deviceType === "Mobile") {
      deviceBrand = "Mobile Device";
      if (/iphone/i.test(ua)) {
        deviceBrand = "iPhone";
      } else if (/ipad/i.test(ua)) {
        deviceBrand = "iPad";
      } else {
        const modelMatch = ua.match(/android\s+[^;]+;\s+([^;)]+)/i);
        if (modelMatch && modelMatch[1]) {
          const model = modelMatch[1].trim();
          if (/samsung|sm-/i.test(ua)) {
            deviceBrand = `Samsung (${model})`;
          } else if (/redmi|xiaomi|mi\s+/i.test(ua)) {
            deviceBrand = `Xiaomi (${model})`;
          } else if (/oppo/i.test(ua)) {
            deviceBrand = `Oppo (${model})`;
          } else if (/vivo/i.test(ua)) {
            deviceBrand = `Vivo (${model})`;
          } else {
            deviceBrand = model;
          }
        }
      }
    } else if (deviceType === "Tablet") {
      deviceBrand = "Tablet";
      if (/ipad/i.test(ua)) {
        deviceBrand = "iPad";
      }
    } else {
      if (/macintosh|mac os x/i.test(ua)) {
        deviceBrand = "Macbook / iMac";
      } else if (/windows/i.test(ua)) {
        deviceBrand = "Windows PC";
      } else if (/linux/i.test(ua)) {
        deviceBrand = "Linux PC";
      }
    }

    // Geolocation lookup for Domicile
    let location = "Localhost";
    if (ip !== "127.0.0.1" && ip !== "::1" && !ip.startsWith("192.168.") && !ip.startsWith("10.")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,countryCode`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          if (geoData.status === "success" && geoData.city) {
            location = `${geoData.city}, ${geoData.regionName || geoData.countryCode}`;
          } else {
            location = "Unknown Location";
          }
        }
      } catch (err) {
        console.error("Geo lookup error:", err);
        location = "Unknown Location";
      }
    }

    // 3. Extract request body params and sanitize input lengths
    const body = await request.json().catch(() => ({}));
    let path = body.path || "/";
    let referrer = body.referrer || "";

    // Limit length to prevent malicious payload overflow
    if (path.length > 255) path = path.substring(0, 255);
    if (referrer.length > 500) referrer = referrer.substring(0, 500);

    // 4. Log to Supabase visitor_logs
    const { error } = await supabase.from("visitor_logs").insert({
      ip_address: ip,
      device_type: deviceType,
      os,
      browser,
      path,
      referrer,
      device_brand: deviceBrand,
      location: location,
    });

    if (error) {
      console.error("Supabase Insert Log Error:", error);
      return NextResponse.json({ error: "Failed to log visit" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
