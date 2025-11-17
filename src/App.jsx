import { useEffect, lazy, Suspense } from 'react';
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
import Loading from './components/common/Loading';
import useSmoothScroll from './hooks/useSmoothScroll';

// Lazy load page components for better performance
const Team = lazy(() => import('./components/pages/Team'));
const Careers = lazy(() => import('./components/pages/Careers'));
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/legal/CookiePolicy'));

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
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {/* Header with navigation */}
        <Header />
        
        {/* Routes with Suspense for lazy-loaded components */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;