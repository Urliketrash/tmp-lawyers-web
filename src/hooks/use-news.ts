import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { NewsItem } from '@/data/newsData';
import { Lawyer } from '@/data/lawyersData';

/**
 * React Query hook to fetch all published news articles from Supabase.
 */
export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      return (data || []).map((item) => ({
        id: item.id,
        title: item.title,
        date: item.date,
        category: item.category,
        summary: item.summary,
        content: item.content,
        imageUrl: item.image_url || '',
        author: item.author,
      })) as NewsItem[];
    },
  });
}

/**
 * React Query hook to fetch all lawyers/team profiles from Supabase.
 */
export function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lawyers')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      return (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        image: item.image || '',
        shortDesc: item.short_desc || '',
        italicDesc: item.italic_desc || '',
        biography: item.biography || undefined,
        email: item.email || undefined,
        instagram: item.instagram || undefined,
        education: item.education || undefined,
        experience: item.experience || undefined,
        skills: item.skills || undefined,
      })) as Lawyer[];
    },
  });
}
