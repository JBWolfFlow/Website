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
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-md'
            : 'bg-transparent'
        )}
      >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('hero')}
            className="flex items-center space-x-3 group"
            aria-label="Go to home"
          >
            <img
              src="/logo.svg"
              alt="NeuroForge Technologies Logo"
              className="h-12 w-12 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-neutral-800 hidden sm:block">
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            {/* Our Team Link */}
            <button
              onClick={() => {
                navigate('/team');
                setIsMobileMenuOpen(false);
              }}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
            >
              Our Team
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Menu Backdrop */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>

    {/* Mobile Navigation Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 md:hidden"
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

          {/* Mobile Menu Items */}
          <nav className="flex flex-col p-4 space-y-2">
            {siteConfig.navigation.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavigation(item.id)}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-200 text-left px-4 py-3 hover:bg-primary-50 rounded-lg active:scale-95"
              >
                {item.label}
              </motion.button>
            ))}
            {/* Our Team Link */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: siteConfig.navigation.length * 0.05 }}
              onClick={() => {
                navigate('/team');
                setIsMobileMenuOpen(false);
              }}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-all duration-200 text-left px-4 py-3 hover:bg-primary-50 rounded-lg active:scale-95"
            >
              Our Team
            </motion.button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default Header;