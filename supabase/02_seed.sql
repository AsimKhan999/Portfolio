-- ============================================================
-- 02_seed.sql - portfolio seed data (run this AFTER 01_tables.sql)
-- Pure ASCII + simple INSERT statements (safe to copy-paste).
-- Safe to re-run: it resets the content tables first.
-- ============================================================

-- Reset content tables so this seed can be re-run safely.
-- NOTE: this only clears content tables, NOT the admin-only messages table.
truncate table public.site_settings,
                 public.projects,
                 public.services,
                 public.experience,
                 public.faqs,
                 public.tech_stack,
                 public.education
restart identity cascade;

-- 1. Site settings (single row, id becomes 1)
insert into public.site_settings (about_paragraphs, hero_intro) values
(
  '["I am a Full-Stack Developer focused on building fast, accessible, and visually consistent web experiences. I combine clean code with clear design to deliver interfaces that are reliable, maintainable, and user-friendly across devices.","My process is collaborative and transparent: discovery, design, development, and iteration. I value performance, semantics, and long-term maintainability so your product scales with confidence.","I work across the full MERN Stack (MongoDB, Express, React, Node.js), as well as PHP and MySQL, delivering end-to-end solutions from database design to polished frontends."]',
  'I specialize in technologies like HTML, CSS, JavaScript, PHP, MySQL, and the MERN Stack (MongoDB, Express, React, Node.js). My passion lies in building responsive, accessible, and visually appealing websites that provide a seamless user experience.'
);

-- 2. Projects
insert into public.projects (title, description, image_url, tags, demo_url, repo_url, sort_order) values
('E-Commerce Platform', 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and Stripe payment integration.', 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["React","Node.js","MongoDB","Stripe"]', '#', 'https://github.com/AsimKhan999', 1),
('Admin Dashboard', 'A comprehensive analytics dashboard with real-time data visualization, user management, and detailed reporting features.', '', '["React","Chart.js"]', 'https://admin-dashboard-three-snowy-80.vercel.app/login', 'https://github.com/AsimKhan999/Admin-Dashboard', 2),
('Social Media App', 'A responsive social platform allowing users to post content, follow others, and interact through likes and comments in real-time.', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', '["MERN Stack","Socket.io","Tailwind"]', '#', 'https://github.com/AsimKhan999', 3);

-- 3. Services
insert into public.services (icon, title, description, sort_order) values
('fab fa-chrome', 'Web Development', 'I build fast, accessible, and scalable websites with clean, modern code. From landing pages to full web apps, I focus on performance, semantics, and a smooth user experience.', 1),
('fas fa-cube', 'Web Design', 'Human-centered interfaces that balance clarity, brand, and conversion. I design pixel-perfect layouts that feel intuitive on every device.', 2),
('fas fa-code', 'Unique Layouts', 'Distinctive layouts that stand out without sacrificing usability. I craft grid-smart compositions and thoughtful typography for a memorable first impression.', 3),
('fas fa-paint-brush', 'Logo Design', 'Memorable marks crafted with strategy, simplicity, and versatility. Your logo will scale beautifully from a favicon to a billboard.', 4);

-- 4. Experience
insert into public.experience (title, description, sort_order) values
('Frontend Developer', 'I translate designs into high-performance, accessible interfaces using modern frameworks and standards. My focus is predictable UI, maintainable code, and measurable results.', 1),
('UI & UX Designer', 'I craft user journeys that are clear and purposeful. From wireframes to high-fidelity prototypes, I design experiences that align user needs with business goals.', 2),
('Full Stack Developer', 'I deliver end-to-end solutions, from robust APIs to polished frontends. I prioritize reliability, security, and clean architecture for long-term sustainability.', 3);

-- 5. FAQs
insert into public.faqs (question, answer, sort_order) values
('How can you contact me?', 'Email is the quickest way: iasimkhan2005@gmail.com. You can also reach out via the contact form or connect on LinkedIn for project inquiries and collaborations.', 1),
('How much time does it take to build a website?', 'Timelines vary by scope. A simple landing page may take 3-5 days, while a custom multi-page site or web app can take 2-6 weeks. I provide a detailed schedule after a brief requirements call.', 2),
('Do you offer any guarantee on your services?', 'Yes. Every project includes milestone reviews, cross-browser testing, and a 14-day post-launch support window for refinements and bug fixes aligned with the agreed scope.', 3);

-- 6. Tech stack (icons as Unicode escapes - decode to emoji)
insert into public.tech_stack (icon, title, description, tags, sort_order) values
('SiJavascript', 'Frontend', 'Building modern, responsive, and accessible user interfaces with pixel-perfect precision.', '["HTML5","CSS3","JavaScript (ES6+)","Responsive","WCAG"]', 1),
('SiReact', 'React.js', 'Component-based UI development with hooks, state management, and React Router for SPAs.', '["React","JSX","Hooks","Router","Context API"]', 2),
('SiNodedotjs', 'Node.js & Express', 'Server-side JavaScript for building RESTful APIs, middleware, and backend services.', '["Node.js","Express","REST APIs","JWT","Middleware"]', 3),
('SiMongodb', 'MongoDB', 'NoSQL database design with Mongoose ODM for flexible, document-based data modeling.', '["MongoDB","Mongoose","Aggregation","CRUD"]', 4),
('SiPhp', 'PHP', 'Server-side scripting for dynamic web pages, form handling, sessions, and logic.', '["PHP","OOP","Sessions","File Handling"]', 5),
('SiMysql', 'SQL & MySQL', 'Relational database design, complex queries, joins, and data management.', '["MySQL","SQL","Joins","Procedures"]', 6),
('SiGit', 'Tools', 'Modern development tools and CSS frameworks for professional-grade development.', '["Tailwind","Git","GitHub","Vite","npm"]', 7),
('FaBolt', 'Performance', 'Optimizing web apps for speed, SEO, and reliability through best practices.', '["Code Splitting","Lazy Loading","Caching"]', 8);

-- 7. Education
insert into public.education (title, description, sort_order) values
('Computer Science', 'Fundamentals of programming, data structures, web technologies, and UI/UX.', 1),
('Professional Development', 'Continuous learning through documentation, courses, and real-world projects.', 2);
