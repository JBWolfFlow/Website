/**
 * Project data configuration
 * Contains all portfolio project information
 */

export const projects = [
  {
    id: 1,
    title: 'Huntress',
    subtitle: 'Flagship · B2B Security',
    status: 'In Development · v0.8',
    category: 'B2B Security',
    lead: 'Jacob Gonsalves',
    description: 'An AI-orchestrated bug bounty platform. A Claude Opus primary orchestrator coordinates 29 specialized vulnerability-hunting agents through ReAct loops with native tool use. Tauri 2.0 desktop app, Rust backend, default-deny security model with Docker sandbox isolation and a kill switch. 12 real-world hunts executed to date; 2,029 TypeScript tests + 108 Rust tests passing.',
    techStack: ['Tauri 2.0', 'Rust', 'TypeScript', 'Claude', 'ReAct'],
    gradient: 'from-red-700 via-rose-800 to-zinc-900',
    image: '/generated/portfolio/huntress.png',
    statusTone: 'blue',
  },
  {
    id: 2,
    title: 'Watch & See',
    subtitle: 'Pre-launch · B2C Marketplace',
    status: 'Beta · TestFlight 60–90 days',
    category: 'B2C Marketplace',
    lead: 'Ethan Hoover',
    description: 'A community-first home for watch enthusiasts. Native iOS app combining feed, collections, grail lists, brand clubs, and a peer-to-peer marketplace. Stripe Connect for payments and payouts, StoreKit 2 for subscriptions, Shippo for shipping labels. 5% standard / 2.5% Power Seller take rate — the lowest in category.',
    techStack: ['SwiftUI', 'Supabase', 'Stripe Connect', 'StoreKit 2', 'Shippo'],
    gradient: 'from-slate-700 via-zinc-800 to-gray-900',
    image: '/generated/portfolio/watch-and-see.png',
    statusTone: 'amber',
  },
  {
    id: 3,
    title: 'Urban Aid',
    subtitle: 'Live · B2C Civic Tech',
    status: 'Live on App Store · 5.0★',
    category: 'B2C Civic Tech',
    lead: 'Ethan Hoover',
    description: 'A civic-tech mobile app helping people find nearby public utilities — water fountains, restrooms, shelters, transit stops, health centers, libraries, free food locations. ~4,000 locations bundled in the app binary for offline-first launch. JWT auth with refresh-token rotation, Redis-backed rate limiting, i18n in 5 languages. Built solo in two months.',
    techStack: ['React Native', 'Expo SDK 53', 'FastAPI', 'PostgreSQL', 'Redis'],
    gradient: 'from-teal-600 via-cyan-700 to-blue-800',
    image: '/generated/portfolio/urban-aid.png',
    statusTone: 'green',
    url: 'https://github.com/JBWolfFlow/UrbanAidV2',
  },
];

/**
 * Get all unique categories from projects
 */
export const getCategories = () => {
  const categories = projects.map(project => project.category);
  return ['All', ...new Set(categories)];
};

/**
 * Filter projects by category
 */
export const filterProjectsByCategory = (category) => {
  if (category === 'All') return projects;
  return projects.filter(project => project.category === category);
};
