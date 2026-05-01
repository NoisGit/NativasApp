# Supabase setup

This folder contains the database files for the NativasApp MVP.

## Files

- `schema.sql`: creates the initial tables, indexes and update triggers.
- `rls-policies.sql`: enables Row Level Security and creates access policies.

## Initial tables

### applications

Stores public recruitment applications sent from the landing page.

Main use cases:

- Receive new applications.
- Review applications from the admin dashboard.
- Track contact status.

### news

Stores team news and updates shown in the landing page.

Main use cases:

- Show published news publicly.
- Keep drafts hidden from the public site.
- Prepare future admin editing.

### admin_profiles

Stores admin profile metadata linked to Supabase Auth users.

Main use cases:

- Identify admin users.
- Restrict admin-only actions with RLS policies.

## How to apply

1. Open your Supabase project.
2. Go to SQL Editor.
3. Run `schema.sql` first.
4. Run `rls-policies.sql` second.
5. Create at least one authenticated admin user.
6. Add that user to `admin_profiles` with the `owner` role.
7. Test permissions before using production data.

## Public app notes

- The frontend should use the public Supabase key from `.env`.
- Public visitors can submit applications.
- Public visitors cannot read applications.
- Public visitors can only read published news.
- Admin actions require an authenticated admin profile.

## Project admin example

Use `admin@nois.dev` for admin examples and local setup documentation.

## Recommended first owner insert

After creating your first Supabase Auth user, add it as owner from the SQL Editor:

```sql
insert into public.admin_profiles (id, email, display_name, role)
values (
  'ADMIN_USER_ID',
  'admin@nois.dev',
  'Admin',
  'owner'
);
```
