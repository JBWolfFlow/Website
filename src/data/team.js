/**
 * Team Members Data
 * Contains information about NeuroForge Technologies team members
 */

export const teamMembers = [
  {
    id: 1,
    name: 'Jacob Gonsalves',
    role: 'Co-Founder & CEO · Product Lead, Huntress',
    image: '/team/jacob-gonsalves.jpg',
    bio: "Jacob is co-founder and CEO of NeuroForge Technologies, leading the company's flagship B2B product, Huntress — an AI-orchestrated bug bounty platform. Huntress is a Tauri 2.0 desktop application with a React + TypeScript frontend and a Rust backend, where a Claude Opus primary orchestrator coordinates 29 specialized vulnerability-hunting agents through ReAct loops with native tool use. Jacob owns the architecture end-to-end: agent design across three model tiers, the default-deny security model, Rust scope validators, Docker sandboxing, the multi-provider model abstraction, and the 2,000+ tests holding it together. His background combines military leadership with self-taught full-stack engineering across TypeScript, Rust, and Python.",
    specialties: ['AI Orchestration & Agents', 'Rust Engineering', 'Full-Stack TypeScript', 'Security Architecture', 'Systems Design'],
    education: 'Meta Full-Stack Developer Professional Certificate | University of Michigan Python 3 Programming Specialization',
    email: 'jacobgonsalves@neuroforgetechnologies.net',
    github: 'https://github.com/JBWolfFlow'
  },
  {
    id: 2,
    name: 'Ethan Hoover',
    role: 'Co-Founder & COO · Product Lead, Watch & See and Urban Aid',
    image: '/team/ethan-hoover.jpg',
    bio: "Ethan is co-founder and COO of NeuroForge Technologies, leading both of the company's consumer products. Watch & See is a native iOS marketplace and community for watch enthusiasts — SwiftUI, Supabase, Stripe Connect, StoreKit 2, with a custom design system and the lowest take rate in its category. Urban Aid is a civic-tech mobile app that helps people find nearby public utilities — water fountains, restrooms, shelters, transit, health centers — live on the App Store with a 5.0★ rating, built solo in two months, with ~4,000 locations indexed and offline-first architecture (React Native + Expo, FastAPI, PostgreSQL, Redis). Ethan owns design, mobile engineering, and backend across both products. His background combines U.S. Army section leadership with a decade of front-end and UI/UX engineering.",
    specialties: ['Native iOS (SwiftUI)', 'React Native + Expo', 'UI/UX Design', 'FastAPI Backends', 'Mobile Architecture'],
    education: 'Self-Taught Engineer',
    email: 'ethanhoover@neuroforgetechnologies.net'
  }
];

export default teamMembers;
