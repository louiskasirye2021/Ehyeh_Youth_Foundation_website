import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { TeamSection } from './components/TeamSection';
import { RegistrationForm } from './components/RegistrationForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TermsConditions } from './pages/TermsConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { FAQ } from './pages/FAQ';
import { StoriesPage } from './pages/StoriesPage';
import { loadSiteContent, useSiteContent } from './content/store';
import logo from 'figma:asset/4ecad429389694574aea2121c507d8e3e7142ef3.png';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';
import './styles/globals.css';

function pageFromHash() {
  const hash = window.location.hash.slice(1); // Remove the '#'
  if (hash === '/terms-conditions') return 'terms';
  if (hash === '/privacy-policy') return 'privacy';
  if (hash === '/faq') return 'faq';
  if (hash === '/admin') return 'admin';
  if (hash === '/stories' || hash.startsWith('/stories/')) return 'stories';
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(pageFromHash);
  const { ready: contentReady } = useSiteContent();

  // Load the website content (one request for every section).
  useEffect(() => {
    loadSiteContent();
  }, []);

  // Start each page at the top.
  useEffect(() => {
    if (currentPage !== 'home') window.scrollTo(0, 0);
  }, [currentPage]);
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Keep track of whether an admin is signed in (Supabase Auth).
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(pageFromHash());

    // Set initial page based on hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    window.location.hash = '/';
  };

  // First visit only: wait briefly for the latest content instead of
  // flashing the old text. Repeat visits render instantly from the cache.
  if (!contentReady && currentPage !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white" aria-busy="true">
        <img src={logo} alt="Ehyeh Youth Foundation" className="h-24 w-auto animate-pulse" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  // Render different pages
  if (currentPage === 'stories') {
    return (
      <>
        <StoriesPage />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentPage === 'terms') {
    return <TermsConditions />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy />;
  }

  if (currentPage === 'faq') {
    return <FAQ />;
  }

  if (currentPage === 'admin') {
    return (
      <>
        {!authChecked ? (
          <div className="min-h-screen flex items-center justify-center text-gray-600">
            Checking sign-in…
          </div>
        ) : session ? (
          <AdminDashboard onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin />
        )}
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <TestimonialsSection />
        <GallerySection />
        <BlogSection />
        <TeamSection />
        <RegistrationForm />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
