import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { NewsCategory, NewsItem } from './news';
import type { UrgentNotice, UrgentNoticeCategory } from './urgentNotices';

export type NewsRow = {
  id: string;
  slug: string;
  published_at: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  image_alt: string;
  homepage_featured: boolean;
  carousel_position: number | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

export type UrgentNoticeRow = {
  id: string;
  category: UrgentNoticeCategory;
  authority: string;
  published_at: string;
  zones: string[];
  title: string;
  instructions: string[];
  expires_at: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

export type AudienceRequestStatus = 'received' | 'in_progress' | 'processed';

export type AudienceRequestRow = {
  id: string;
  tracking_code: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: AudienceRequestStatus;
  created_at: string;
  updated_at: string;
};

type Table<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      news_articles: Table<
        NewsRow,
        Omit<NewsRow, 'id' | 'created_at' | 'updated_at'>,
        Partial<Omit<NewsRow, 'id' | 'created_at' | 'updated_at'>>
      >;
      urgent_notices: Table<
        UrgentNoticeRow,
        Omit<UrgentNoticeRow, 'id' | 'created_at' | 'updated_at'>,
        Partial<Omit<UrgentNoticeRow, 'id' | 'created_at' | 'updated_at'>>
      >;
      admin_users: Table<
        { user_id: string; created_at: string },
        { user_id: string; created_at?: string },
        { created_at?: string }
      >;
      audience_requests: Table<
        AudienceRequestRow,
        Omit<AudienceRequestRow, 'id' | 'created_at' | 'updated_at'>,
        Partial<Omit<AudienceRequestRow, 'id' | 'created_at' | 'updated_at'>>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      save_news_article: {
        Args: {
          p_id: string | null;
          p_slug: string;
          p_published_at: string;
          p_category: NewsCategory;
          p_title: string;
          p_excerpt: string;
          p_body: string;
          p_image_url: string;
          p_image_alt: string;
          p_homepage_featured: boolean;
          p_carousel_position: number | null;
          p_status: 'draft' | 'published';
        };
        Returns: string;
      };
      submit_audience_request: {
        Args: {
          p_name: string;
          p_email: string | null;
          p_phone: string | null;
          p_subject: string;
          p_message: string;
        };
        Returns: string;
      };
      get_audience_request_status: {
        Args: { p_tracking_code: string };
        Returns: Array<{
          status: AudienceRequestStatus;
          created_at: string;
          updated_at: string;
        }>;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let client: SupabaseClient<Database> | null = null;

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  if (!client) {
    client = createClient<Database>(url, key, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  }

  return client;
}

export async function toNewsItem(supabase: SupabaseClient<Database>, row: NewsRow): Promise<NewsItem> {
  let imageUrl: string | null = null;
  if (row.image_url) {
    const { data, error } = await supabase.storage.from('news-images').createSignedUrl(row.image_url, 3_600);
    if (error) throw error;
    imageUrl = data.signedUrl;
  }

  return {
    id: row.id,
    slug: row.slug,
    date: row.published_at,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    imagePath: row.image_url || null,
    imageUrl,
    imageAlt: row.image_alt,
    homeFeatured: row.homepage_featured,
    carouselPosition: row.carousel_position,
    status: row.status,
  };
}

export function toUrgentNotice(row: UrgentNoticeRow): UrgentNotice {
  return {
    id: row.id,
    category: row.category,
    authority: row.authority,
    date: row.published_at,
    zones: row.zones,
    title: row.title,
    instructions: row.instructions,
    expiresAt: row.expires_at,
    status: row.status,
  };
}

export async function loadPublishedNews() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return Promise.all(data.map((row) => toNewsItem(supabase, row)));
}

export async function loadAdminNews() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return Promise.all(data.map((row) => toNewsItem(supabase, row)));
}

export async function loadNewsBySlug(slug: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data ? toNewsItem(supabase, data) : null;
}

export async function loadPublishedUrgentNotices() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('urgent_notices')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data.map(toUrgentNotice);
}

export async function loadAdminUrgentNotices() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('urgent_notices')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data.map(toUrgentNotice);
}

export async function loadAdminAudienceRequests() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('audience_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export function subscribeToCmsTable(table: 'news_articles' | 'urgent_notices' | 'audience_requests', onChange: () => void) {
  const supabase = getSupabaseClient();
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`cms-${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table }, onChange)
    .subscribe((status) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.error(`Connexion temps réel interrompue pour ${table}: ${status}`);
      }
    });

  return () => {
    void supabase.removeChannel(channel);
  };
}

