import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import { SiteDataProvider } from './context/SiteDataContext';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/sections/Dashboard';
import ProjectsSection from './pages/admin/sections/ProjectsSection';
import ServicesSection from './pages/admin/sections/ServicesSection';
import ExperienceSection from './pages/admin/sections/ExperienceSection';
import FaqsSection from './pages/admin/sections/FaqsSection';
import TechStackSection from './pages/admin/sections/TechStackSection';
import EducationSection from './pages/admin/sections/EducationSection';
import MessagesSection from './pages/admin/sections/MessagesSection';
import SettingsSection from './pages/admin/sections/SettingsSection';
import NotFound from './pages/NotFound';

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <AIChatbot />
      <Header />
      <main>
      <Outlet />
      </main>
      <Footer />
    </>
  );
}

function Admin() {
  return <AdminLayout />;
}

function App() {
  return (
    <Router>
      <SiteDataProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsSection />} />
            <Route path="services" element={<ServicesSection />} />
            <Route path="experience" element={<ExperienceSection />} />
            <Route path="faqs" element={<FaqsSection />} />
            <Route path="tech-stack" element={<TechStackSection />} />
            <Route path="education" element={<EducationSection />} />
            <Route path="messages" element={<MessagesSection />} />
            <Route path="settings" element={<SettingsSection />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteDataProvider>
    </Router>
  );
}

export default App;
