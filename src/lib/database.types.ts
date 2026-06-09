export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/**
 * TypeScript definitions for Supabase PostgreSQL database tables.
 */
export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          title: string;
          date: string;
          category: string;
          summary: string;
          content: string;
          image_url: string | null;
          author: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          date?: string;
          category?: string;
          summary: string;
          content: string;
          image_url?: string | null;
          author?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          category?: string;
          summary?: string;
          content?: string;
          image_url?: string | null;
          author?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      lawyers: {
        Row: {
          id: string;
          name: string;
          role: string;
          image: string | null;
          short_desc: string;
          italic_desc: string;
          biography: string | null;
          email: string | null;
          instagram: string | null;
          education: string[] | null;
          experience: string[] | null;
          skills: string[] | null;
          display_order: number | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          role: string;
          image?: string | null;
          short_desc: string;
          italic_desc: string;
          biography?: string | null;
          email?: string | null;
          instagram?: string | null;
          education?: string[] | null;
          experience?: string[] | null;
          skills?: string[] | null;
          display_order?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          image?: string | null;
          short_desc?: string;
          italic_desc?: string;
          biography?: string | null;
          email?: string | null;
          instagram?: string | null;
          education?: string[] | null;
          experience?: string[] | null;
          skills?: string[] | null;
          display_order?: number | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
