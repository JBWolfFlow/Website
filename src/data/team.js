/**
 * Team Members Data
 * Contains information about AryaTech team members
 */

export const teamMembers = [
  {
    id: 1,
    name: 'Jacob Gonsalves',
    role: 'CEO · Product Lead, Huntress',
    image: '/team/jacob-gonsalves.jpg',
    bio: "Jacob is CEO of AryaTech and the product lead for Huntress, the company's flagship B2B platform. Huntress is an AI-orchestrated bug bounty platform — a Tauri 2.0 desktop application with a React + TypeScript frontend and a Rust backend — where specialized vulnerability-hunting agents coordinate through ReAct loops with native tool use. Jacob owns the architecture end-to-end: agent design across model tiers, the default-deny security model, Rust scope validators, Docker sandboxing, multi-provider model abstraction, custom model training for task-specific applications, and the 2,000+ tests holding it together. His background combines military leadership with deep full-stack engineering across TypeScript, Rust, and Python.",
    specialties: ['AI Orchestration & Agents', 'Rust Engineering', 'Full-Stack TypeScript', 'Security Architecture', 'Systems Design'],
    education: 'Meta Full-Stack Developer Professional Certificate | University of Michigan Python 3 Programming Specialization',
    email: 'jacobgonsalves@arya-tech.net',
    github: 'https://github.com/JBWolfFlow'
  },
  {
    id: 2,
    name: 'Ethan Hoover',
    role: 'COO · Product Lead, Watch & See and Urban Aid',
    image: '/team/ethan-hoover.jpg',
    bio: "Ethan is COO of AryaTech and the product lead for Watch & See and Urban Aid. Watch & See is a native iOS marketplace and community for watch enthusiasts — SwiftUI, Supabase, Stripe Connect, StoreKit 2, with a custom design system and the lowest take rate in its category. Urban Aid is a civic-tech mobile app that helps people find nearby public utilities — water fountains, restrooms, shelters, transit, health centers — live on the App Store with a 5.0★ rating, ~4,000 locations indexed, and offline-first architecture (React Native + Expo, FastAPI, PostgreSQL, Redis). Ethan owns design, mobile engineering, and backend across both products. His background combines U.S. Army section leadership with a decade of front-end and UI/UX engineering.",
    specialties: ['Native iOS (SwiftUI)', 'React Native + Expo', 'UI/UX Design', 'FastAPI Backends', 'Mobile Architecture'],
    education: 'Self-Taught Engineer',
    email: 'ethanhoover@arya-tech.net'
  }
];

export default teamMembers;
