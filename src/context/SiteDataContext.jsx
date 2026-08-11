import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getProjects, getServices, getExperience, getFaqs, getTechStack, getEducation, getSiteSettings } from '../lib/api';

const SiteDataContext = createContext({ data: null, loading: true, error: null, refresh: () => {} });

const loadAllSections = async () => {
  const [settings, projects, services, experience, faqs, techStack, education] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getServices(),
    getExperience(),
    getFaqs(),
    getTechStack(),
    getEducation(),
  ]);
  return { settings, projects, services, experience, faqs, techStack, education };
};

export function SiteDataProvider({ children }) {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refresh content whenever the route changes so admin edits appear instantly.
  useEffect(() => {
    const run = async () => {
      try {
        setData(await loadAllSections());
        setError(null);
      } catch (err) {
        console.error('Failed to load site content:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [location.pathname]);

  const refresh = useCallback(async () => {
    try {
      setData(await loadAllSections());
      setError(null);
    } catch (err) {
      console.error('Failed to load site content:', err);
      setError(err);
    }
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </SiteDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteData() {
  return useContext(SiteDataContext);
}
