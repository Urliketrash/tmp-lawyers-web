import { MOCK_NEWS, NewsItem } from "@/data/newsData";
import NewsDetailContent from "@/components/NewsDetailContent";
import { createClient } from "@/lib/supabase-server";

// Generate params for static export
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("news").select("id");
    if (data && data.length > 0) {
        return data.map((item) => ({
            id: item.id,
        }));
    }
  } catch (e) {
    console.error("Supabase build fetch failed, using mock", e);
  }
  
  // Fallback to mock
  return MOCK_NEWS.map((news) => ({
    id: news.id,
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let news: NewsItem | undefined;

  // 1. Try finding in MOCK first (fastest for demo)
  news = MOCK_NEWS.find((item) => item.id === id);

  // 2. If not in mock, try fetching from Supabase
  if (!news) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        if (data) {
            news = {
                id: data.id,
                title: data.title,
                date: data.date,
                category: data.category,
                summary: data.summary,
                content: data.content,
                imageUrl: data.image_url || "",
                author: data.author
            };
        }
    } catch (error) {
        console.error("Error fetching unique news:", error);
    }
  }

  if (!news) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            News Not Found
        </div>
    );
  }

  return <NewsDetailContent news={news} />;
}
