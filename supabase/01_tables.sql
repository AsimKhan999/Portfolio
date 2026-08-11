-- ============================================================
-- 01_tables.sql - create tables + RLS policies (no data)
-- Run this in the Supabase SQL editor with RLS ENABLED.
-- Safe to re-run (uses IF NOT EXISTS).
-- ============================================================

-- 1. site_settings - single row of global content
create table if not exists public.site_settings (
  id bigint generated always as identity primary key,
  name text default 'Asim Khan',
  role text default 'Full-Stack Developer',
  tagline text default 'Full-Stack Developer',
  email text default 'iasimkhan2005@gmail.com',
  location text default 'Available for Remote Work',
  hero_intro text default 'I specialize in technologies like HTML, CSS, JavaScript, PHP, MySQL, and the MERN Stack (MongoDB, Express, React, Node.js). My passion lies in building responsive, accessible, and visually appealing websites that provide a seamless user experience.',
  about_paragraphs jsonb default '[]'::jsonb,
  socials jsonb default '[{"label":"GitHub","url":"https://github.com/AsimKhan999","icon":"fab fa-github"},{"label":"LinkedIn","url":"https://www.linkedin.com/in/asim-khan-3258bb3a2/","icon":"fab fa-linkedin-in"},{"label":"Email","url":"mailto:iasimkhan2005@gmail.com","icon":"fas fa-envelope"}]'::jsonb,
  web3forms_key text default '5895fe30-291e-4a86-8796-ab1285827554',
  copyright text default 'All Rights Reserved',
  updated_at timestamptz default now()
);

-- 2. projects
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  image_url text default '',
  image_position text default 'center center',
  tags jsonb default '[]'::jsonb,
  demo_url text default '#',
  repo_url text default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. services
create table if not exists public.services (
  id bigint generated always as identity primary key,
  icon text default 'fas fa-code',
  title text not null,
  description text not null default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. experience
create table if not exists public.experience (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. faqs
create table if not exists public.faqs (
  id bigint generated always as identity primary key,
  question text not null,
  answer text not null default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. tech_stack
create table if not exists public.tech_stack (
  id bigint generated always as identity primary key,
  icon text default E'\U0001F310',
  title text not null,
  description text not null default '',
  tags jsonb default '[]'::jsonb,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. education
create table if not exists public.education (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. messages - contact form inbox
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- 9. login_attempts - brute-force lockout tracker (used by the API with the service role key)
create table if not exists public.login_attempts (
  ip text primary key,
  fail_count int not null default 0,
  lockout_until timestamptz,
  updated_at timestamptz default now()
);

-- ---------- ROW LEVEL SECURITY ----------
-- Public site can READ content; only the authenticated admin can write.
-- Enable RLS: choose "run with RLS" in the Supabase editor.

alter table public.site_settings enable row level security;
alter table public.projects        enable row level security;
alter table public.services        enable row level security;
alter table public.experience      enable row level security;
alter table public.faqs            enable row level security;
alter table public.tech_stack      enable row level security;
alter table public.education       enable row level security;
alter table public.messages        enable row level security;
alter table public.login_attempts  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['site_settings','projects','services','experience','faqs','tech_stack','education'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin write" on public.%I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t);
  end loop;
end $$;

-- messages: admin only
drop policy if exists "admin read messages" on public.messages;
drop policy if exists "admin write messages" on public.messages;
create policy "admin read messages" on public.messages for select using (auth.role() = 'authenticated');
create policy "admin write messages" on public.messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
