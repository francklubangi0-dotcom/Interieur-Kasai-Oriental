create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to anon;

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  published_at date not null default current_date,
  category text not null check (category in ('ACTUALITÉ', 'COMMUNIQUÉ', 'INSTITUTION')),
  title text not null,
  excerpt text not null,
  body text not null,
  image_url text not null default '',
  image_alt text not null,
  homepage_featured boolean not null default false,
  carousel_position smallint check (carousel_position between 1 and 3),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists news_one_homepage_featured
  on public.news_articles (homepage_featured)
  where homepage_featured and status = 'published';

create unique index if not exists news_unique_carousel_position
  on public.news_articles (carousel_position)
  where carousel_position is not null and status = 'published';

insert into public.news_articles (
  slug, published_at, category, title, excerpt, body, image_alt,
  homepage_featured, carousel_position, status
) values
  (
    '25-10-2026', '2026-10-25', 'INSTITUTION',
    'LE GOUVERNEUR ÉCHANGE AVEC DES CHEFS COUTUMIERS DE BAKWA KALONJI',
    'Une consultation et une identification des conflits coutumiers sont menées avec les chefs coutumiers de Bakwa Kalonji.',
    'Une consultation et une identification des conflits coutumiers sont menées avec les chefs coutumiers de Bakwa Kalonji.',
    'Le gouverneur échange avec les chefs coutumiers de Bakwa Kalonji.',
    false, 3, 'published'
  ),
  (
    '20-10-2026', '2026-10-20', 'ACTUALITÉ',
    'Le ministre provincial de l’Intérieur assure l’intérim du gouverneur',
    'En l''absence du gouverneur et du vice-gouverneur, Me Patrick Mukendi Makanda est appelé à assurer l''intérim à la tête de la province du Kasaï Oriental.',
    'En l''absence du gouverneur et du vice-gouverneur, Me Patrick Mukendi Makanda est appelé à assurer l''intérim à la tête de la province du Kasaï Oriental.',
    'Le ministre provincial de l’Intérieur du Kasaï-Oriental.',
    true, 1, 'published'
  ),
  (
    '07-10-2026', '2026-10-07', 'ACTUALITÉ',
    'Consultations et identification des conflits coutumiers dans la chefferie de Bakwa Kalonji',
    'La séance est présidée par le gouverneur de province.',
    'La séance est présidée par le gouverneur de province.',
    'Consultations et identification des conflits coutumiers.',
    false, 2, 'published'
  ),
  (
    '06-10-2026', '2026-10-06', 'COMMUNIQUÉ',
    'CONSULTATION DES CHEFS COUTUMIERS DES GROUPEMENTS DU TERRITOIRE DE KABEYA KAMUANGA',
    'Cette rencontre se tiendra dans la salle des réunions du Gouvernorat de Province, à Mbujimayi, à partir de 09 h précises.',
    'Cette rencontre se tiendra dans la salle des réunions du Gouvernorat de Province, à Mbujimayi, à partir de 09 h précises.',
    'Consultation des chefs coutumiers des groupements du territoire de Kabeya Kamuanga.',
    false, null, 'published'
  )
on conflict (slug) do nothing;

create or replace function public.save_news_article(
  p_id uuid,
  p_slug text,
  p_published_at date,
  p_category text,
  p_title text,
  p_excerpt text,
  p_body text,
  p_image_url text,
  p_image_alt text,
  p_homepage_featured boolean,
  p_carousel_position smallint,
  p_status text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
begin
  if not public.is_admin() then
    raise exception 'not_authorized';
  end if;

  if p_category not in ('ACTUALITÉ', 'COMMUNIQUÉ', 'INSTITUTION')
    or p_status not in ('draft', 'published')
    or p_carousel_position is not null and p_carousel_position not between 1 and 3 then
    raise exception 'invalid_news_fields';
  end if;

  if p_status = 'published' and p_homepage_featured then
    update public.news_articles
    set homepage_featured = false
    where status = 'published'
      and homepage_featured
      and id is distinct from p_id;
  end if;

  if p_status = 'published' and p_carousel_position is not null then
    update public.news_articles
    set carousel_position = null
    where status = 'published'
      and carousel_position = p_carousel_position
      and id is distinct from p_id;
  end if;

  if p_id is null then
    insert into public.news_articles (
      slug, published_at, category, title, excerpt, body, image_url,
      image_alt, homepage_featured, carousel_position, status
    ) values (
      p_slug, p_published_at, p_category, p_title, p_excerpt, p_body, p_image_url,
      p_image_alt, p_homepage_featured, p_carousel_position, p_status
    )
    returning id into saved_id;
  else
    update public.news_articles
    set slug = p_slug,
        published_at = p_published_at,
        category = p_category,
        title = p_title,
        excerpt = p_excerpt,
        body = p_body,
        image_url = p_image_url,
        image_alt = p_image_alt,
        homepage_featured = p_homepage_featured,
        carousel_position = p_carousel_position,
        status = p_status
    where id = p_id
    returning id into saved_id;

    if saved_id is null then
      raise exception 'news_article_not_found';
    end if;
  end if;

  return saved_id;
end;
$$;

revoke all on function public.save_news_article(uuid, text, date, text, text, text, text, text, text, boolean, smallint, text) from public;
grant execute on function public.save_news_article(uuid, text, date, text, text, text, text, text, text, boolean, smallint, text) to authenticated;

create table if not exists public.urgent_notices (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in (
    'security-alert',
    'temporary-access-restriction',
    'calm-appeal',
    'rumor-warning',
    'accident-disaster',
    'service-closure',
    'digital-service-interruption',
    'road-danger',
    'witness-appeal',
    'administrative-measure'
  )),
  authority text not null,
  published_at date not null default current_date,
  zones text[] not null,
  title text not null,
  instructions text[] not null,
  expires_at date not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at >= published_at)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists news_articles_updated_at on public.news_articles;
create trigger news_articles_updated_at
  before update on public.news_articles
  for each row execute function public.set_updated_at();

drop trigger if exists urgent_notices_updated_at on public.urgent_notices;
create trigger urgent_notices_updated_at
  before update on public.urgent_notices
  for each row execute function public.set_updated_at();

alter table public.news_articles enable row level security;
alter table public.urgent_notices enable row level security;

grant select on public.news_articles, public.urgent_notices to anon, authenticated;
grant insert, update, delete on public.news_articles, public.urgent_notices to authenticated;

drop policy if exists "Published news is public; administrators can read all" on public.news_articles;
create policy "Published news is public; administrators can read all"
  on public.news_articles for select to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "Administrators manage news" on public.news_articles;
create policy "Administrators manage news"
  on public.news_articles for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Published notices are public; administrators can read all" on public.urgent_notices;
create policy "Published notices are public; administrators can read all"
  on public.urgent_notices for select to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "Administrators manage notices" on public.urgent_notices;
create policy "Administrators manage notices"
  on public.urgent_notices for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', false)
on conflict (id) do update set public = false;

drop policy if exists "Published news images are public" on storage.objects;
create policy "Published news images are public"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'news-images'
    and (
      public.is_admin()
      or exists (
        select 1
        from public.news_articles
        where image_url = name
          and status = 'published'
      )
    )
  );

drop policy if exists "Administrators upload news images" on storage.objects;
create policy "Administrators upload news images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'news-images' and public.is_admin());

drop policy if exists "Administrators update news images" on storage.objects;
create policy "Administrators update news images"
  on storage.objects for update to authenticated
  using (bucket_id = 'news-images' and public.is_admin())
  with check (bucket_id = 'news-images' and public.is_admin());

drop policy if exists "Administrators delete news images" on storage.objects;
create policy "Administrators delete news images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'news-images' and public.is_admin());

do $$
begin
  alter publication supabase_realtime add table public.news_articles;
exception
  when duplicate_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.urgent_notices;
exception
  when duplicate_object then null;
end;
$$;

-- Create an Auth user in the Supabase dashboard, then allowlist that user's UUID:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@example.org'
-- on conflict do nothing;
