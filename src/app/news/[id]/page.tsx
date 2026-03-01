import { MOCK_NEWS, NewsItem } from "@/data/newsData";
import NewsDetailContent from "@/components/NewsDetailContent";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Generate params for static export
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
        }));
    }
  } catch (e) {
    console.error("Firebase build fetch failed, using mock", e);
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

  // 2. If not in mock, try fetching from Firebase
  if (!news) {
    try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            news = {
                id: docSnap.id,
                title: data.title,
                date: data.date,
                category: data.category,
                summary: data.summary,
                content: data.content,
                imageUrl: data.imageUrl,
                author: data.author
            } as NewsItem;
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
