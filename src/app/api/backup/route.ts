import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
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

    // 2. Fetch all data from database tables in parallel
    const [newsRes, lawyersRes, settingsRes] = await Promise.all([
      supabase.from("news").select("*"),
      supabase.from("lawyers").select("*"),
      supabase.from("site_settings").select("*")
    ]);

    if (newsRes.error) throw newsRes.error;
    if (lawyersRes.error) throw lawyersRes.error;
    if (settingsRes.error) throw settingsRes.error;

    // 3. Construct the backup structure
    const backupData = {
      exportedAt: new Date().toISOString(),
      exportedBy: user.email,
      data: {
        news: newsRes.data || [],
        lawyers: lawyersRes.data || [],
        siteSettings: settingsRes.data || []
      }
    };

    // Return the response as JSON file download
    return new NextResponse(JSON.stringify(backupData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="tmp_lawyers_backup_${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (err: any) {
    console.error("Backup export error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
