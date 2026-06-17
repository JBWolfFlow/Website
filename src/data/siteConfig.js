/**
 * Site Configuration
 * Central configuration for site metadata, contact information, and social links
 */

export const siteConfig = {
  // Basic site information
  name: 'AryaTech',
  tagline: 'Intelligent Solutions, Secure Future.',
  description: 'AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard.',
  url: 'https://ayra-tech.net',

  // Contact information
  // Canonical company inbox. Founders' personal addresses are surfaced
  // individually in the Contact section (sourced from team data).
  email: 'contact@ayra-tech.net',
  phone: '(206) 876-0437',

  // Social media links
  social: {
    github: 'https://github.com/JBWolfFlow',
  },
  
  // Navigation sections
  navigation: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Capabilities' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Track Record' },
    { id: 'contact', label: 'Contact' },
  ],
  
  // SEO metadata
  seo: {
    keywords: [
      'AI orchestration',
      'bug bounty platform',
      'watch marketplace',
      'civic tech',
      'React Native',
      'Rust engineering',
      'mobile development',
      'SwiftUI iOS',
      'production software engineering',
      'Temple TX',
    ],
    author: 'AryaTech',
    ogImage: '/og-image.jpg',
  },
};