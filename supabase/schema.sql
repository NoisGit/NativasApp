-- NativasApp Supabase schema
-- MVP tables for applications, news and admin profiles.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  birth_date date not null,
  city text,
  pronouns text,
  skating_experience text,
  availability text,
  why_join text not null,
  contact_preference text default 'email' check (contact_preference in ('email', 'phone', 'whatsapp')),
  accepted_privacy boolean not null default false,
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  content text,
  category text,
  cover_image_url text,
  instagram_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'admin' check (role in ('owner', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_created_at_idx on public.applications(created_at desc);
create index if not exists news_status_idx on public.news(status);
create index if not exists news_published_at_idx on public.news(published_at desc);

create trigger set_applications_updated_at
before update on public.applications
for each row
execute function public.set_updated_at();

create trigger set_news_updated_at
before update on public.news
for each row
execute function public.set_updated_at();

create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row
execute function public.set_updated_at();
