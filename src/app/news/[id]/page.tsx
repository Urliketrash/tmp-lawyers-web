import { MOCK_NEWS, NewsItem } from "@/data/newsData";
import NewsDetailContent from "@/components/NewsDetailContent";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import { ArticleJsonLd } from "@/components/JsonLd";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Generate params for static export
export async function generateStaticParams() {
  try {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  let news: NewsItem | undefined = MOCK_NEWS.find((item) => item.id === id);

  if (!news) {
    try {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();
      
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
      console.error("Error fetching unique news for metadata:", error);
    }
  }

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  return {
    title: `${news.title} | TMP Law Firm`,
    description: news.summary,
    openGraph: {
      title: news.title,
      description: news.summary,
      images: news.imageUrl ? [{ url: news.imageUrl }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.summary,
      images: news.imageUrl ? [news.imageUrl] : [],
    },
  };
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

  return (
    <>
      <ArticleJsonLd
        title={news.title}
        description={news.summary}
        imageUrl={news.imageUrl}
        datePublished={news.date}
        authorName={news.author || "Admin Team"}
        publisherName="TMP Law Firm"
        publisherLogo="https://tmplawyers.com/assets/logo.png"
        url={`https://tmplawyers.com/news/${news.id}`}
      />
      <NewsDetailContent news={news} />
    </>
  );
}
