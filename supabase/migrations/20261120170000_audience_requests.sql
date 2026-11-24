create table if not exists public.audience_requests (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique,
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text check (email is null or char_length(email) <= 254),
  phone text check (phone is null or char_length(phone) between 6 and 30),
  subject text not null check (char_length(subject) between 5 and 160),
  message text not null check (char_length(message) between 20 and 5000),
  status text not null default 'received'
    check (status in ('received', 'in_progress', 'processed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create index if not exists audience_requests_created_at
  on public.audience_requests (created_at desc);

drop trigger if exists audience_requests_updated_at on public.audience_requests;
create trigger audience_requests_updated_at
  before update on public.audience_requests
  for each row execute function public.set_updated_at();

alter table public.audience_requests enable row level security;

revoke all on table public.audience_requests from anon, authenticated;
grant select on table public.audience_requests to authenticated;
grant update (status) on table public.audience_requests to authenticated;

drop policy if exists "Administrators read audience requests" on public.audience_requests;
create policy "Administrators read audience requests"
  on public.audience_requests for select to authenticated
  using (public.is_admin());

drop policy if exists "Administrators update audience request status" on public.audience_requests;
create policy "Administrators update audience request status"
  on public.audience_requests for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.submit_audience_request(
  p_name text,
  p_email text,
  p_phone text,
  p_subject text,
  p_message text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text := pg_catalog.btrim(coalesce(p_name, ''));
  v_email text := nullif(pg_catalog.btrim(coalesce(p_email, '')), '');
  v_phone text := nullif(pg_catalog.btrim(coalesce(p_phone, '')), '');
  v_subject text := pg_catalog.btrim(coalesce(p_subject, ''));
  v_message text := pg_catalog.btrim(coalesce(p_message, ''));
  v_tracking_code text;
begin
  if pg_catalog.char_length(v_name) not between 2 and 120
    or pg_catalog.char_length(v_subject) not between 5 and 160
    or pg_catalog.char_length(v_message) not between 20 and 5000
    or (v_email is null and v_phone is null)
    or v_email is not null and (
      pg_catalog.char_length(v_email) > 254
      or v_email !~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    )
    or v_phone is not null and pg_catalog.char_length(v_phone) not between 6 and 30 then
    raise exception using errcode = '22023', message = 'invalid_audience_request';
  end if;

  v_tracking_code := 'AUD-' || pg_catalog.upper(pg_catalog.replace(pg_catalog.gen_random_uuid()::text, '-', ''));

  insert into public.audience_requests (
    tracking_code, full_name, email, phone, subject, message
  ) values (
    v_tracking_code, v_name, v_email, v_phone, v_subject, v_message
  );

  return v_tracking_code;
end;
$$;

revoke all on function public.submit_audience_request(text, text, text, text, text) from public;
grant execute on function public.submit_audience_request(text, text, text, text, text) to anon, authenticated;

create or replace function public.get_audience_request_status(p_tracking_code text)
returns table(status text, created_at timestamptz, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select request.status, request.created_at, request.updated_at
  from public.audience_requests as request
  where request.tracking_code =
    pg_catalog.upper(pg_catalog.btrim(coalesce(p_tracking_code, '')))
    and request.tracking_code ~ '^AUD-[A-F0-9]{32}$'
  limit 1;
$$;

revoke all on function public.get_audience_request_status(text) from public;
grant execute on function public.get_audience_request_status(text) to anon, authenticated;

do $$
begin
  alter publication supabase_realtime add table public.audience_requests;
exception
  when duplicate_object then null;
end;
$$;
