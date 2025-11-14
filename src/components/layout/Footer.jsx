import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { siteConfig } from '@data/siteConfig';

/**
 * Footer Component
 * Site footer with company information, social links, and copyright
 * Features:
 * - Company branding
 * - Quick navigation links
 * - Social media icons
 * - Contact information
 * - Copyright notice
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.svg"
                alt="NeuroForge Technologies Logo"
                className="h-12 w-12"
              />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-neutral-400">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-neutral-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.slice(1).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              <Link
                to="/privacy"
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;