/**
 * Project data configuration
 * Contains all portfolio project information
 */

export const projects = [
  {
    id: 1,
    title: 'DCOP: Defense Contracting Operations Platform',
    category: 'AI & Government Solutions',
    description: 'Revolutionizing federal procurement with AI-powered opportunity discovery, real-time NAICS analytics, and secure, offline-first mobile access—integrating SAM.gov and USAspending.gov for streamlined insights and strategic advantage.',
    techStack: ['React Native', 'AI/ML', 'Offline-First', 'Government APIs'],
    gradient: 'from-blue-600 to-indigo-700',
    image: '/projects/dcop-home.png',
  },
  {
    id: 2,
    title: 'DCOP: NAICS Directory',
    category: 'AI & Government Solutions',
    description: 'Comprehensive NAICS code directory with intelligent search and industry classification for federal contracting opportunities.',
    techStack: ['React Native', 'Search Optimization', 'Data Analytics'],
    gradient: 'from-indigo-600 to-purple-700',
    image: '/projects/dcop-naics.png',
  },
  {
    id: 3,
    title: 'DCOP: Market Analytics',
    category: 'AI & Government Solutions',
    description: 'Real-time market saturation analysis and award trend visualization for strategic federal contracting decisions.',
    techStack: ['Data Visualization', 'Analytics Engine', 'USAspending API'],
    gradient: 'from-purple-600 to-pink-700',
    image: '/projects/dcop-analytics.png',
  },
  {
    id: 4,
    title: 'DCOP: Contract Opportunities',
    category: 'AI & Government Solutions',
    description: 'Live federal contracting opportunities with advanced filtering, NAICS-based search, and real-time updates from SAM.gov.',
    techStack: ['SAM.gov Integration', 'Real-time Sync', 'Advanced Filters'],
    gradient: 'from-cyan-600 to-blue-700',
    image: '/projects/dcop-opportunities.png',
  },
  {
    id: 5,
    title: 'DCOP: Opportunity Details',
    category: 'AI & Government Solutions',
    description: 'Detailed contract opportunity viewer with comprehensive information, deadlines, and direct portal access.',
    techStack: ['Document Parsing', 'Data Integration', 'Mobile UI'],
    gradient: 'from-blue-600 to-cyan-700',
    image: '/projects/dcop-detail.png',
  },
  {
    id: 6,
    title: 'DCOP: Government Portals',
    category: 'AI & Government Solutions',
    description: 'Unified access to SAM.gov, USAspending.gov, Acquisition.gov, and FPDS with secure authentication and seamless navigation.',
    techStack: ['API Integration', 'Secure Access', 'Multi-Portal Management'],
    gradient: 'from-green-600 to-teal-700',
    image: '/projects/dcop-portals.png',
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