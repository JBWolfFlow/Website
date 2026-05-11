/**
 * Site Configuration
 * Central configuration for site metadata, contact information, and social links
 */

export const siteConfig = {
  // Basic site information
  name: 'NeuroForge Technologies',
  tagline: 'Two founders. Three products. Production software across two markets.',
  description: 'NeuroForge Technologies is a two-founder engineering company shipping production software in B2B security and B2C consumer products. We build our own products end-to-end — Huntress, Watch & See, and Urban Aid — across desktop, web, and mobile.',
  url: 'https://neuroforgetechnologies.net',

  // Contact information
  email: 'contact@neuroforgetechnologies.net',
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
      'founder-led software',
      'Temple TX',
    ],
    author: 'NeuroForge Technologies',
    ogImage: '/og-image.jpg',
  },
};