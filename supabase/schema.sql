-- Run in Supabase: SQL Editor > New query
create table public.materials (
  id uuid primary key default gen_random_uuid(),
  section int not null check (section between 1 and 5),
  sub text not null,
  title text not null,
  kind text not null check (kind in ('file','link')),
  url text not null,
  file_path text,
  file_name text,
  created_at timestamptz not null default now()
);
create index on public.materials (section, sub);
alter table public.materials enable row level security;

-- Anyone can read; only signed-in admins can add/change/remove
create policy "public read" on public.materials for select using (true);
create policy "admin insert" on public.materials for insert to authenticated with check (true);
create policy "admin update" on public.materials for update to authenticated using (true);
create policy "admin delete" on public.materials for delete to authenticated using (true);

-- Storage bucket for PDF / PPT / Word files
insert into storage.buckets (id, name, public, file_size_limit)
values ('materials', 'materials', true, 52428800)
on conflict (id) do nothing;
create policy "public read files" on storage.objects for select using (bucket_id = 'materials');
create policy "admin upload files" on storage.objects for insert to authenticated with check (bucket_id = 'materials');
create policy "admin delete files" on storage.objects for delete to authenticated using (bucket_id = 'materials');
