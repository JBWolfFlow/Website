import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  return (
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {siteConfig.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 text-left px-4 py-2 hover:bg-neutral-50 rounded-lg"
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
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 text-left px-4 py-2 hover:bg-neutral-50 rounded-lg"
              >
                Our Team
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;