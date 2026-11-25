# LGRC website (Next.js + Supabase)

## Setup
1. Create a project at supabase.com.
2. SQL Editor → paste and run `supabase/schema.sql` (table, storage bucket, security rules).
3. Authentication → Users → **Add user** (email + password). This is the admin login.
   Authentication → Providers → Email → turn **off** "Allow new users to sign up" so only you can add admins.
4. Copy `.env.local.example` to `.env.local` and fill in Project URL + anon key (Project Settings → API).
5. `npm install` then `npm run dev` → http://localhost:3000
6. Edit `lib/sections.js` for the portal/other links and program names.

## Deploy
Push to GitHub → import in Vercel → add the same two env vars → Deploy.

## How it works
- Visitors can browse and open materials (no login).
- Admins sign in at /login to upload files or add links; delete with ×.
- Files go to the `materials` storage bucket; rows go to `public.materials`.

## Logo
Save the DILG seal as `public/logo.png` (square PNG). It appears in the header automatically; until then a "DILG" badge shows.
