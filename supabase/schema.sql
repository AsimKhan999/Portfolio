-- ============================================================
-- Portfolio Admin - full schema + seed (one-shot combined file)
-- NOTE: this file is split into two smaller, easier-to-run files:
--   supabase/01_tables.sql  (tables + RLS, no data)
--   supabase/02_seed.sql    (seed data, run after 01)
-- Use the split files if you run into any paste/editor trouble.
-- Run this in the Supabase SQL editor with RLS ENABLED.
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

-- 8. messages - contact form inbox (web3forms is kept as the send path,
--    an optional Vercel function can also insert here; see /api/contact.js)
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

-- ---------- SEED DATA (matches the current hardcoded content) ----------

insert into public.site_settings (about_paragraphs, hero_intro)
select '["I am a Full-Stack Developer focused on building fast, accessible, and visually consistent web experiences. I combine clean code with clear design to deliver interfaces that are reliable, maintainable, and user-friendly across devices.","My process is collaborative and transparent: discovery, design, development, and iteration. I value performance, semantics, and long-term maintainability so your product scales with confidence.","I work across the full MERN Stack (MongoDB, Express, React, Node.js), as well as PHP and MySQL, delivering end-to-end solutions from database design to polished frontends."]'::jsonb,
       'I specialize in technologies like HTML, CSS, JavaScript, PHP, MySQL, and the MERN Stack (MongoDB, Express, React, Node.js). My passion lies in building responsive, accessible, and visually appealing websites that provide a seamless user experience.'
where not exists (select 1 from public.site_settings);

insert into public.projects (title, description, image_url, tags, demo_url, repo_url, sort_order)
select * from (values
  ('E-Commerce Platform',
   'A full-stack e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration.',
   'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
   '["React","Node.js","MongoDB","Stripe"]'::jsonb,
   '#', 'https://github.com/AsimKhan999', 1),
  ('Admin Dashboard',
   'A comprehensive analytics dashboard with real-time data visualization, user management, and detailed reporting features.',
   '', '["React","Chart.js"]'::jsonb,
   'https://admin-dashboard-three-snowy-80.vercel.app/login', 'https://github.com/AsimKhan999/Admin-Dashboard', 2),
  ('Social Media App',
   'A responsive social platform allowing users to post content, follow others, and interact through likes and comments in real-time.',
   'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
   '["MERN Stack","Socket.io","Tailwind"]'::jsonb,
   '#', 'https://github.com/AsimKhan999', 3)
) as s(title, description, image_url, tags, demo_url, repo_url, sort_order)
where not exists (select 1 from public.projects);

insert into public.services (icon, title, description, sort_order)
select * from (values
  ('fab fa-chrome', 'Web Development', 'I build fast, accessible, and scalable websites with clean, modern code. From landing pages to full web apps, I focus on performance, semantics, and a smooth user experience.', 1),
  ('fas fa-cube', 'Web Design', 'Human-centered interfaces that balance clarity, brand, and conversion. I design pixel-perfect layouts that feel intuitive on every device.', 2),
  ('fas fa-code', 'Unique Layouts', 'Distinctive layouts that stand out without sacrificing usability. I craft grid-smart compositions and thoughtful typography for a memorable first impression.', 3),
  ('fas fa-paint-brush', 'Logo Design', 'Memorable marks crafted with strategy, simplicity, and versatility. Your logo will scale beautifully from a favicon to a billboard.', 4)
) as s(icon, title, description, sort_order)
where not exists (select 1 from public.services);

insert into public.experience (title, description, sort_order)
select * from (values
  ('Frontend Developer', 'I translate designs into performant, accessible interfaces using modern frameworks and standards. My focus is predictable UI, maintainable code, and measurable results.', 1),
  ('UI & UX Designer', 'I craft user journeys that are clear and purposeful. From wireframes to high-fidelity prototypes, I design experiences that align user needs with business goals.', 2),
  ('Full Stack Developer', 'I deliver end-to-end solutions, from robust APIs to polished frontends. I prioritize reliability, security, and clean architecture for long-term sustainability.', 3)
) as s(title, description, sort_order)
where not exists (select 1 from public.experience);

insert into public.faqs (question, answer, sort_order)
select * from (values
  ('How can you contact me?', 'Email is the quickest way: iasimkhan2005@gmail.com. You can also reach out via the contact form or connect on LinkedIn for project inquiries and collaborations.', 1),
  ('How much time does it take to build a website?', 'Timelines vary by scope. A simple landing page may take 3-5 days, while a custom multi-page site or web app can take 2-6 weeks. I provide a detailed schedule after a brief requirements call.', 2),
  ('Do you offer any guarantee on your services?', 'Yes. Every project includes milestone reviews, cross-browser testing, and a 14-day post-launch support window for refinements and bug fixes aligned with the agreed scope.', 3)
) as s(question, answer, sort_order)
where not exists (select 1 from public.faqs);

insert into public.tech_stack (icon, title, description, tags, sort_order)
select * from (values
  ('SiJavascript', 'Frontend', 'Building modern, responsive, and accessible user interfaces with pixel-perfect precision.', '["HTML5","CSS3","JavaScript (ES6+)","Responsive","WCAG"]'::jsonb, 1),
  ('SiReact', 'React.js', 'Component-based UI development with hooks, state management, and React Router for SPAs.', '["React","JSX","Hooks","Router","Context API"]'::jsonb, 2),
  ('SiNodedotjs', 'Node.js & Express', 'Server-side JavaScript for building RESTful APIs, middleware, and backend services.', '["Node.js","Express","REST APIs","JWT","Middleware"]'::jsonb, 3),
  ('SiMongodb', 'MongoDB', 'NoSQL database design with Mongoose ODM for flexible, document-based data modeling.', '["MongoDB","Mongoose","Aggregation","CRUD"]'::jsonb, 4),
  ('SiPhp', 'PHP', 'Server-side scripting for dynamic web pages, form handling, sessions, and logic.', '["PHP","OOP","Sessions","File Handling"]'::jsonb, 5),
  ('SiMysql', 'SQL & MySQL', 'Relational database design, complex queries, joins, and data management.', '["MySQL","SQL","Joins","Procedures"]'::jsonb, 6),
  ('SiGit', 'Tools', 'Modern development tools and CSS frameworks for professional-grade development.', '["Tailwind","Git","GitHub","Vite","npm"]'::jsonb, 7),
  ('FaBolt', 'Performance', 'Optimizing web apps for speed, SEO, and reliability through best practices.', '["Code Splitting","Lazy Loading","Caching"]'::jsonb, 8)
) as s(icon, title, description, tags, sort_order)
where not exists (select 1 from public.tech_stack);

insert into public.education (title, description, sort_order)
select * from (values
  ('Computer Science', 'Fundamentals of programming, data structures, web technologies, and UI/UX.', 1),
  ('Professional Development', 'Continuous learning through documentation, courses, and real-world projects.', 2)
) as s(title, description, sort_order)
where not exists (select 1 from public.education);

-- ---------- ROW LEVEL SECURITY ----------
-- Public site can READ everything; only the authenticated admin can write.

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

-- messages: nobody reads via anon; admin only
drop policy if exists "admin read messages" on public.messages;
drop policy if exists "admin write messages" on public.messages;
create policy "admin read messages" on public.messages for select using (auth.role() = 'authenticated');
create policy "admin write messages" on public.messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- STORAGE ----------
-- Create a public bucket for images. Run separately in the dashboard OR uncomment:
-- insert into storage.buckets (id, name, public) values ('images', 'images', true)
--   on conflict (id) do nothing;
-- Then grant upload to the admin role:
-- create policy "admin upload images" on storage.objects for insert to authenticated
--   with check (bucket_id = 'images');
