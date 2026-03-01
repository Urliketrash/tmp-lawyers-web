"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsItem } from "@/data/newsData";

// Fallback Mock Data if Firebase is not configured or empty
import { MOCK_NEWS } from "@/data/newsData";

import ConfirmDialog from "./ConfirmDialog";
import ActionLoader from "./ActionLoader";

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionLoader, setActionLoader] = useState({
    isLoading: false,
    status: 'loading' as 'loading' | 'success' | 'error',
    message: ''
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Try to fetch from Firebase
      const querySnapshot = await getDocs(collection(db, "news"));
      if (!querySnapshot.empty) {
        const firebaseNews: NewsItem[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            firebaseNews.push({
                id: doc.id,
                title: data.title,
                date: data.date,
                category: data.category,
                summary: data.summary,
                content: data.content,
                imageUrl: data.imageUrl,
                author: data.author
            } as NewsItem);
        });
        setNews(firebaseNews);
      } else {
        // If empty or error, use Mock Data temporarily for demo
        console.log("No data found, using Mock Data");
        setNews(MOCK_NEWS);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback to mock data on error (e.g. missing permission/keys)
      setNews(MOCK_NEWS);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    
    setIsConfirmOpen(false);
    setActionLoader({ isLoading: true, status: 'loading', message: 'Deleting Article...' });

    try {
      await deleteDoc(doc(db, "news", deleteId));
      
      // Update state to remove deleted item
      setNews(news.filter(item => item.id !== deleteId));
      
      setActionLoader({ isLoading: true, status: 'success', message: 'Article Deleted Successfully!' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 1500);
      
    } catch (error) {
      console.error("Error deleting document: ", error);
      setActionLoader({ isLoading: true, status: 'error', message: 'Failed to delete article.' });
      setTimeout(() => setActionLoader(prev => ({ ...prev, isLoading: false })), 3000);
    } finally {
        setDeleteId(null);
    }
  };

  if (loading) {
      return <div className="p-8 text-center text-gray-500">Loading data...</div>;
  }

  return (
    <div className="bg-tmp-black border border-white/10 rounded-lg overflow-hidden">
        <ActionLoader 
            isLoading={actionLoader.isLoading} 
            status={actionLoader.status} 
            message={actionLoader.message} 
        />
        
        <ConfirmDialog
            isOpen={isConfirmOpen}
            title="Delete Article?"
            message="Are you sure you want to delete this article? This action cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsConfirmOpen(false)}
            confirmLabel="Delete"
            isDestructive={true}
        />

        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-white font-bold text-sm">Published Articles</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-black/50 text-tmp-gold text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {news.map((item) => (
                        <tr key={item.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                            <td className="px-6 py-4">
                                <span className="bg-white/10 text-white px-2 py-1 rounded text-[10px] uppercase font-bold">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={`/admin/news/edit?id=${item.id}`} className="text-tmp-gold hover:text-white mr-4 transition-colors">Edit</Link>
                                <button 
                                    onClick={() => handleDeleteClick(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
