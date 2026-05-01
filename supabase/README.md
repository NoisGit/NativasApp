# Supabase setup

This folder contains the database files for the NativasApp MVP.

## Files

- `schema.sql`: creates the initial tables, indexes and update triggers.

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
3. Copy the content from `schema.sql`.
4. Run the SQL.
5. Continue with RLS policies before connecting production data.

## Next step

Add Row Level Security policies in a separate SQL file before exposing admin features.
