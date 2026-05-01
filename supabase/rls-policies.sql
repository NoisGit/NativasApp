-- NativasApp Supabase RLS policies
-- Run this after `schema.sql`.

alter table public.applications enable row level security;
alter table public.news enable row level security;
alter table public.admin_profiles enable row level security;

create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role in ('owner', 'admin')
  );
end;
$$ language plpgsql security definer set search_path = public;

-- Applications
-- Public visitors can submit an application, but cannot read applications.
create policy "Public can submit applications"
on public.applications
for insert
to anon, authenticated
with check (
  full_name is not null
  and email is not null
  and phone is not null
  and birth_date is not null
  and why_join is not null
  and accepted_privacy = true
  and status = 'new'
  and internal_notes is null
);

create policy "Admins can read applications"
on public.applications
for select
to authenticated
using (public.is_admin());

create policy "Admins can update applications"
on public.applications
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- News
-- Public visitors can only read published news.
create policy "Public can read published news"
on public.news
for select
to anon, authenticated
using (status = 'published');

create policy "Admins can read all news"
on public.news
for select
to authenticated
using (public.is_admin());

create policy "Admins can create news"
on public.news
for insert
to authenticated
with check (public.is_admin());

create policy "Admins can update news"
on public.news
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can archive news"
on public.news
for delete
to authenticated
using (public.is_admin());

-- Admin profiles
-- Admin users can read their own profile.
create policy "Admins can read own profile"
on public.admin_profiles
for select
to authenticated
using (id = auth.uid());

-- Owners can read all admin profiles.
create policy "Owners can read admin profiles"
on public.admin_profiles
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'owner'
  )
);

-- Owners can manage admin profiles.
create policy "Owners can manage admin profiles"
on public.admin_profiles
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role = 'owner'
  )
);
