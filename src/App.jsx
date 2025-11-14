import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import SEO from './components/common/SEO';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';
import Team from './components/pages/Team';
import Careers from './components/pages/Careers';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import CookiePolicy from './components/legal/CookiePolicy';
import useSmoothScroll from './hooks/useSmoothScroll';

/**
 * HomePage Component
 * Main landing page with all sections
 */
function HomePage() {
  // Enable smooth scrolling for all anchor links
  useSmoothScroll(80);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Main content area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}

/**
 * ScrollToTop Component
 * Scrolls to top of page on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main App Component
 * Root component with routing support
 * Includes routes for main page and legal pages
 */
function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Header with navigation */}
        <Header />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;