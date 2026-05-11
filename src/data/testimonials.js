/**
 * Track Record — concrete metrics from shipped and in-development products.
 * Renders as a stat-card grid (see Testimonials.jsx).
 */

export const trackRecord = [
  {
    id: 1,
    value: '5.0★',
    label: 'App Store Rating',
    source: 'Urban Aid · live on the App Store',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 2,
    value: '2,137',
    label: 'Automated Tests Passing',
    source: 'Huntress · TypeScript + Rust test suites',
    gradient: 'from-slate-700 to-zinc-800',
  },
  {
    id: 3,
    value: '29',
    label: 'AI Agents Orchestrated',
    source: 'Huntress · specialized vulnerability-hunting agents',
    gradient: 'from-red-600 to-rose-700',
  },
  {
    id: 4,
    value: '~4,000',
    label: 'Locations Indexed',
    source: 'Urban Aid · bundled offline-first in the app binary',
    gradient: 'from-cyan-500 to-blue-700',
  },
  {
    id: 5,
    value: '5',
    label: 'Languages Supported',
    source: 'Urban Aid · English, Spanish, French, Hindi, Arabic',
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 6,
    value: '3',
    label: 'Production Codebases',
    source: 'Desktop (Tauri), iOS (SwiftUI), cross-platform mobile (React Native)',
    gradient: 'from-indigo-600 to-purple-700',
  },
];

export default trackRecord;
