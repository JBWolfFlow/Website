/**
 * Site Configuration
 * Central configuration for site metadata, contact information, and social links
 */

export const siteConfig = {
  // Basic site information
  name: 'NeuroForge Technologies',
  tagline: 'Forging Intelligent Solutions for a Connected Future',
  description: 'At NeuroForge Technologies, we merge artificial intelligence, modern software engineering, and human creativity to build systems that think, learn, and evolve. Every line of code we write is crafted with precision and purpose — shaping the future of digital innovation one solution at a time.',
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
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ],
  
  // SEO metadata
  seo: {
    keywords: [
      'web development',
      'digital agency',
      'react development',
      'modern websites',
      'UI/UX design',
      'responsive design',
      'web applications',
    ],
    author: 'NeuroForge Technologies',
    ogImage: '/og-image.jpg',
  },
};