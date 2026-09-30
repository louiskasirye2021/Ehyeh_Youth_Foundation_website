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
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';
import './styles/globals.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
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
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      
      if (hash === '/terms-conditions') {
        setCurrentPage('terms');
      } else if (hash === '/privacy-policy') {
        setCurrentPage('privacy');
      } else if (hash === '/faq') {
        setCurrentPage('faq');
      } else if (hash === '/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    // Set initial page based on hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    window.location.hash = '/';
  };

  // Render different pages
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
