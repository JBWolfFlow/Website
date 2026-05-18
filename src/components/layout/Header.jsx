import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@data/siteConfig';
import { cn } from '@utils/cn';

/**
 * Header Component
 * Responsive navigation header with smooth scroll and mobile menu
 * Features:
 * - Fixed/sticky positioning
 * - Scroll-based background blur
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 */
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation - supports both routing and scrolling
  const handleNavigation = (sectionId) => {
    // If we're on a legal page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // Already on homepage, just scroll
      scrollToSection(sectionId);
    }
  };

  // Smooth scroll to section with offset for fixed header
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu
      setIsMobileMenuOpen(false);
      
      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, `#${sectionId}`);
      }
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <nav
          className={cn(
            'pointer-events-auto flex items-center gap-2 md:gap-4 px-3 md:px-4 py-2 rounded-full',
            'backdrop-blur-xl transition-all duration-300',
            isScrolled
              ? 'bg-white/80 border border-neutral-200/60 shadow-lg shadow-neutral-900/5'
              : 'bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          )}
          aria-label="Primary"
        >
          {/* Logo */}
          <button
            onClick={() => handleNavigation('hero')}
            className="flex items-center space-x-2 group px-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Go to home"
          >
            <img
              src="/logo-mark.png"
              alt="AryaTech Logo"
              className="h-8 w-auto group-hover:scale-110 transition-transform duration-300"
            />
            <span
              className={cn(
                'text-base font-bold hidden sm:block transition-colors duration-300',
                isScrolled ? 'text-neutral-800' : 'text-white'
              )}
            >
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            {siteConfig.navigation.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                navigate('/team');
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
                isScrolled
                  ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              )}
            >
              Our Team
            </button>
          </div>

          {/* Get in Touch CTA (desktop) */}
          <button
            onClick={() => handleNavigation('contact')}
            className={cn(
              'hidden md:inline-flex items-center px-4 py-1.5 ml-1 text-sm font-semibold rounded-full transition-all duration-300',
              isScrolled
                ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'
                : 'bg-white/10 text-white border border-white/30 hover:bg-white/15'
            )}
            aria-label="Get in touch with AryaTech"
          >
            Get in Touch
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'md:hidden p-2 rounded-full transition-colors',
              isScrolled
                ? 'text-neutral-700 hover:text-primary-600'
                : 'text-white/85 hover:text-white'
            )}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </header>

    {/* Mobile Menu Backdrop */}
    <AnimatePresence mode="wait">
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
      )}
    </AnimatePresence>

    {/* Mobile Navigation Menu */}
    <AnimatePresence mode="wait">
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8
          }}
          className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 md:hidden"
          style={{
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <span className="text-lg font-bold text-neutral-800">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-neutral-700 hover:text-primary-600 transition-colors rounded-lg hover:bg-neutral-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items - No individual animations for better performance */}
          <nav className="flex flex-col p-4 space-y-2">
            {siteConfig.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-150 text-left px-4 py-3 hover:bg-primary-50 rounded-lg active:scale-95"
              >
                {item.label}
              </button>
            ))}
            {/* Our Team Link */}
            <button
              onClick={() => {
                navigate('/team');
                setIsMobileMenuOpen(false);
              }}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-150 text-left px-4 py-3 hover:bg-primary-50 rounded-lg active:scale-95"
            >
              Our Team
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default Header;