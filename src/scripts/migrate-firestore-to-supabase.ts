import { createClient } from '@supabase/supabase-js';
import { lawyersData } from '../data/lawyersData';
import { MOCK_NEWS } from '../data/newsData';

// Initialize Supabase client
// Note: In local development, you should run this script with environment variables set:
// NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npx tsx src/scripts/migrate-firestore-to-supabase.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in your environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Seeds static lawyers data to Supabase database.
 */
async function seedLawyers() {
  console.log('Seeding lawyers...');
  for (const lawyer of lawyersData) {
    const dbLawyer = {
      id: lawyer.id,
      name: lawyer.name,
      role: lawyer.role,
      image: lawyer.image,
      short_desc: lawyer.shortDesc,
      italic_desc: lawyer.italicDesc,
      biography: lawyer.biography || null,
      email: lawyer.email || null,
      instagram: lawyer.instagram || null,
      education: lawyer.education || null,
      experience: lawyer.experience || null,
      skills: lawyer.skills || null,
      display_order: lawyer.id === 'founder' ? 0 : 1,
    };

    const { error } = await supabase.from('lawyers').upsert(dbLawyer);
    if (error) {
      console.error(`Failed to seed lawyer ${lawyer.name}:`, error);
    } else {
      console.log(`Successfully seeded lawyer: ${lawyer.name}`);
    }
  }
}

/**
 * Seeds mock news data or migrates Firestore news to Supabase.
 */
async function seedNews() {
  console.log('Seeding news...');
  for (const news of MOCK_NEWS) {
    const dbNews = {
      title: news.title,
      date: news.date,
      category: news.category,
      summary: news.summary,
      content: news.content,
      image_url: news.imageUrl,
      author: news.author,
    };

    const { error } = await supabase.from('news').insert(dbNews);
    if (error) {
      console.error(`Failed to seed news "${news.title}":`, error);
    } else {
      console.log(`Successfully seeded news: "${news.title}"`);
    }
  }
}

async function run() {
  try {
    await seedLawyers();
    await seedNews();
    console.log('Migration & Seeding finished successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

run();
