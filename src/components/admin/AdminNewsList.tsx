"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/data/newsData";

// Fallback Mock Data if database is empty
import { MOCK_NEWS } from "@/data/newsData";

import ConfirmDialog from "./ConfirmDialog";
import ActionLoader from "./ActionLoader";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedNews: NewsItem[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          category: item.category,
          summary: item.summary,
          content: item.content,
          imageUrl: item.image_url || "",
          author: item.author
        }));
        setNews(mappedNews);
      } else {
        console.log("No news articles in database, showing mock data");
        setNews(MOCK_NEWS);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
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
      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;
      
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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {news.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="text-white font-medium">{item.title}</TableCell>
                        <TableCell>
                            <span className="bg-white/10 text-white px-2 py-1 rounded text-[10px] uppercase font-bold">
                                {item.category}
                            </span>
                        </TableCell>
                        <TableCell>
                            {new Date(item.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                            <Link href={`/admin/news/edit?id=${item.id}`} className="text-tmp-gold hover:text-white mr-4 transition-colors font-bold text-xs uppercase tracking-widest">Edit</Link>
                            <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(item.id)}
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold"
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
