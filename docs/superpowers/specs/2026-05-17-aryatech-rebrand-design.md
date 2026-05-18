# AryaTech Rebrand — Design Specification

**Date:** 2026-05-17
**Status:** Draft pending user approval
**Author:** Claude (Opus 4.7) + Jacob Gonsalves
**Project:** NeuroForge Technologies Website → AryaTech

---

## Summary

Rebrand the existing NeuroForge Technologies website to AryaTech. Scope is **name + tagline only** for copy (positioning and product portfolio are preserved), plus a **full component-level visual overhaul** using gpt-image-2 as the design authority. Work is delivered in four independently-deployable phases.

---

## 1. Brand Identity (established, not designed here)

| Field | Value |
|---|---|
| Display name | **AryaTech** (spelling: A-R-Y-A) |
| Domain | **ayra-tech.net** (spelling: A-Y-R-A — intentional, both spellings are correct in their respective contexts) |
| Founder emails | `jacobgonsalves@ayra-tech.net` (primary), `ethanhoover@ayra-tech.net` |
| Tagline | `Intelligent Solutions, Secure Future.` |
| Logo + favicons | Provided in `C:\Users\jacob\OneDrive\Desktop\Website Rebrand\aryatech_logo_assets\` |
| Visual identity | Gradient royal-blue → deep navy with paper-plane orange accent; stylized "A" mark with swoosh and paper-plane motif |
| Visual direction | Tech-forward gradient (Cursor / Anthropic / Pinecone reference) |

**Positioning (unchanged from NeuroForge):** Engineering company shipping production software across desktop, web, and mobile. Own product portfolio (Huntress, Watch & See, Urban Aid) plus open to client engagements. Two founders: Jacob Gonsalves, Ethan Hoover.

---

## 2. Brand System (token definitions)

### Color tokens (Tailwind)

| Token | Hex | Role |
|---|---|---|
| `primary-500` (brand-blue) | `#1E5BFF` | Primary CTAs, links, "Tech" wordmark color |
| `primary-700` | `#0F35A8` | Mid-gradient stop |
| `primary-800` (brand-navy) | `#0B2A6B` | Headlines, "Arya" wordmark color, dark sections |
| `primary-950` | `#050F33` | Hero gradient terminus, dark-mode-tinted bg |
| `accent-300` | `#FFB04A` | Gradient highlight on paper-plane motif |
| `accent-500` (brand-orange) | `#FF8A1E` | Single accent — emphasis, hover states, badges |
| `neutral-50` through `neutral-950` | Cool grays, slightly blue-tinted | Body text, surfaces, borders |

Full scales for `primary`, `accent`, and `neutral` are defined in Phase 2's Tailwind config rewrite (see Phase 2 section).

### Signature gradients

- **Primary:** `linear-gradient(135deg, #1E5BFF 0%, #0B2A6B 60%, #050F33 100%)`
- **Accent:** `linear-gradient(135deg, #FFB04A 0%, #FF8A1E 100%)`
- **Brand mesh (decorative):** radial overlays of brand-blue + brand-orange at low opacity over `#050F33`

### Typography

- **Primary:** Inter (already loaded). Logo wordmark pairs cleanly. Weights: hero 800, sections 700, body 400/500, buttons 600.
- **Accent:** JetBrains Mono — for code/tech-stack chips, version tags, technical specs. Reinforces the AI-native engineering feel.

### Surface treatments

- **Glass (light):** `bg-white/70 backdrop-blur-lg border border-neutral-200/50`
- **Glass (dark):** `bg-white/5 backdrop-blur-xl border border-white/10`
- **Gradient borders:** 1px gradient outline on hover for primary CTAs and feature cards
- **Glow:** subtle box-shadow with brand-blue at ~20% opacity on hover for interactive elements
- **Mesh backgrounds:** generated via gpt-image-2 (Phase 4), not pure CSS — gives Cursor-level richness

### Mode strategy

Light-mode-first for readability and SEO. Hero and CTA sections use the dark gradient mesh — hybrid model that matches the logo's energy without forcing dark mode site-wide.

---

## 3. Phase 1 — Mechanical Rebrand

The "ship in hours" phase. Pure find/replace + file swaps. No design decisions, no component changes.

### Text replacements (`src/`, `public/`, root configs, root `*.md`)

| Old | New |
|---|---|
| `NeuroForge Technologies` | `AryaTech` |
| `NeuroForge` (standalone) | `AryaTech` |
| `neuroforgetechnologies.net` | `ayra-tech.net` |
| `contact@neuroforgetechnologies.net` | `jacobgonsalves@ayra-tech.net` (primary) |
| `Engineering production software across desktop, web, and mobile.` | `Intelligent Solutions, Secure Future.` |
| Hero subheadline with company name | Replace `NeuroForge Technologies` → `AryaTech`, keep structure |

Markdown docs at repo root (`README.md`, `DEPLOYMENT_GUIDE.md`, etc.) get the same find/replace treatment — cheap, prevents future confusion.

### File replacements

| Path | Action |
|---|---|
| `public/logo.svg` | Delete; add `public/logo.png` copied from `aryatech_full_logo_transparent.png`. Update all references in `Header.jsx`, `Footer.jsx`, and `index.html` from `/logo.svg` → `/logo.png`. (Vector SVG version can be re-derived later if needed; PNG is sufficient for current display sizes.) |
| `public/favicon.ico` | Replace with `aryatech_logo_assets/favicon.ico` |
| `public/apple-touch-icon.png` (if exists) | From `aryatech_favicon_512.png` |
| `public/manifest.json` | Update `name`, `short_name`, icon paths, `theme_color: #1E5BFF`, `background_color: #FFFFFF` |
| `public/og-image.jpg` | **Phase 1 temp:** logo on navy background. **Phase 4:** replace with gpt-image-2 generated OG. |
| `public/CNAME` | `neuroforgetechnologies.net` → `ayra-tech.net` |
| `public/sitemap.xml` | Update URL base |
| `public/robots.txt` | Update sitemap URL + canonical |
| `public/.well-known/security.txt` | Update contact email |
| `index.html` | Update `<title>`, meta description, OG tags, JSON-LD structured data |

### Config-only files

`.htaccess`, `nginx-security.conf`, `vercel.json`, `.env.example`, `.github/workflows/deploy.yml` — scan and update any hard-coded domain references.

### Out of scope for Phase 1

- Tailwind color tokens (Phase 2)
- Any React component structure or styling (Phase 3)
- Any new imagery (Phase 4)
- Team page photos (real photos kept)
- Product descriptions (Huntress/Watch & See/Urban Aid copy stays; only the parent company name changes)

### Phase 1 acceptance criteria

- `grep -ri "NeuroForge\|neuroforge"` returns zero hits in `src/` and `public/`
- `npm run build` succeeds
- `npm run dev` loads `localhost:3000` with no broken images
- New favicon shows in browser tab; new logo shows in Header
- View-source on homepage shows `<title>` and OG meta with `AryaTech` + `ayra-tech.net`
- Contact section and Footer show both founder emails

---

## 4. Phase 2 — Design Tokens

Tailwind config + CSS variable rewrite. Existing components inherit automatically — no JSX edits.

### Files modified

| File | Change |
|---|---|
| `tailwind.config.js` | Rewrite `theme.extend.colors` for `primary`, `accent`, `neutral` per the scales below |
| `src/styles/index.css` | Update `.gradient-text`, `.glass`, add `.glass-dark`, add `.bg-brand-mesh`, add JetBrains Mono `@import`, add `.font-mono` utility, update scrollbar tint to brand-blue, update `:focus-visible` outline |
| `public/manifest.json` | `theme_color: #1E5BFF` (set in Phase 1, confirmed here) |

### Full Tailwind color scales

```js
// tailwind.config.js — theme.extend.colors
colors: {
  primary: {
    50:  '#EEF3FF',
    100: '#D9E4FF',
    200: '#B5C9FF',
    300: '#85A4FF',
    400: '#527CFF',
    500: '#1E5BFF',   // brand blue
    600: '#1546D6',
    700: '#0F35A8',
    800: '#0B2A6B',   // brand navy
    900: '#070D33',
    950: '#050F33',
  },
  accent: {
    50:  '#FFF5E6',
    100: '#FFE5BF',
    200: '#FFCC85',
    300: '#FFB04A',
    400: '#FF9A2E',
    500: '#FF8A1E',   // brand orange
    600: '#E66F00',
    700: '#B85800',
    800: '#8A4200',
    900: '#5C2D00',
  },
  neutral: {
    50:  '#F7F9FC',
    100: '#EEF1F6',
    200: '#DDE3EC',
    300: '#C2CBD8',
    400: '#9AA5B6',
    500: '#6B7686',
    600: '#4B5567',
    700: '#343D4F',
    800: '#1F2738',
    900: '#0F1524',
    950: '#070B17',
  },
}
```

### CSS layer updates (`src/styles/index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

.gradient-text {
  @apply bg-gradient-to-r from-primary-500 via-primary-700 to-accent-500 bg-clip-text text-transparent;
}

.glass { @apply bg-white/70 backdrop-blur-lg border border-neutral-200/50; }
.glass-dark { @apply bg-white/5 backdrop-blur-xl border border-white/10; }

.bg-brand-mesh {
  background:
    radial-gradient(circle at 20% 30%, rgba(30, 91, 255, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 138, 30, 0.25) 0%, transparent 50%),
    linear-gradient(135deg, #050F33 0%, #0B2A6B 100%);
}

.font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
```

### Phase 2 acceptance criteria

- `npm run dev` loads with no console errors
- Hero gradient blobs render in blue/orange (no indigo/pink leak)
- CTAs are royal blue with orange hover
- Accent word in Hero ("production") is now orange
- Service check marks are orange
- Header + Footer pick up new palette automatically
- No layout shifts vs. pre-Phase-2

---

## 5. Phase 3 — UI Design via gpt-image-2

**Authoritative workflow:** gpt-image-2 designs each section visually. I implement React + Tailwind to faithfully match the approved mockup. No CSS guesswork.

### Per-section pipeline

1. Brief gpt-image-2 with section purpose + brand system + Cursor/Anthropic vibe reference + actual section copy.
2. Generate **1 mockup per section** at high quality (1536×1024 for sections, 1024×1024 for components).
3. Show in chat; iterate via `start_edit_session` / `continue_edit_session` if needed.
4. Implement in React + Tailwind matching the approved mockup spirit (not pixel-perfect — has to flex responsively).
5. Extract any embedded imagery (mesh backgrounds, device frames, decorative shapes) as standalone gpt-image-2 calls, save to `public/generated/`, reference from component.

### Section queue (order of execution)

| # | Section | Mockup size | Notes |
|---|---|---|---|
| 1 | Hero | 1536×1024 | Dark gradient mesh, big tagline headline, gradient/glow CTAs, paper-plane decorative element. Sets tone for everything. |
| 2 | Header / Nav | 1536×256 | Glassmorphism floating nav, logo left, links center, CTA right |
| 3 | Services ("What We Build") | 1536×1024 | Bento grid, glass cards with gradient borders, mono-font tech-stack chips |
| 4 | Portfolio | 1536×1024 | Three project cards as device-frame mockups, gradient surfaces, status badges |
| 5 | About / Team | 1536×1024 | Two-column: founder cards (real photos kept) + brand story in glass panel |
| 6 | Testimonials / Track Record | 1536×1024 | Stat cards + quote cards over subtle mesh background |
| 7 | Contact | 1536×1024 | Two-column: copy + form. Glass form panel, dual founder emails displayed |
| 8 | Footer | 1536×512 | Dark navy background, full logo, columns of links, paper-plane accent |

### Code translation principles

- Layout → real responsive flex/grid (mockup is desktop; mobile is implementer's responsibility)
- Colors → Tailwind tokens from Phase 2 (not raw hex from the mockup)
- Imagery → either `<img>` from `public/generated/` or pure CSS (gradient meshes = CSS; device mockups = images)
- Typography → Inter sizes per Section 2 scale; JetBrains Mono for code chips
- Animations → preserve current Framer Motion patterns; add subtle parallax/glow where mockup implies motion

### Risk: mockup ↔ code drift

gpt-image-2 may generate gorgeous but impractical layouts. Mitigation: prompts will explicitly constrain to "responsive web layout, standard component patterns, no fancy curves that won't reflow."

### Phase 3 acceptance criteria (per section)

- gpt-image-2 mockup approved by user in chat
- Implementation visually matches mockup at desktop width
- Mobile degrades gracefully at 375 / 768 / 1280 / 1920 px
- No console errors, no broken images
- Lighthouse perf doesn't regress significantly
- One commit per section for revert granularity

---

## 6. Phase 4 — Standalone Asset Generation

Targeted gpt-image-2 calls for images that are referenced by the components built in Phase 3 but are standalone assets (not section mockups).

### Asset inventory

| Asset | Size | Purpose |
|---|---|---|
| Hero background mesh | 2400×1600 | CSS `background-image` for Hero (PNG/WebP) |
| Huntress mockup | 1024×1024 | Portfolio card image |
| Watch & See mockup | 1024×1024 | Portfolio card image |
| Urban Aid mockup | 1024×1024 | Portfolio card image |
| OG image | 1200×630 | Social share preview (`public/og-image.jpg`) |
| 404 illustration | 1024×1024 | Friendly error visual |
| Decorative paper-plane accent | 512×512 | Header / Hero accent. **Note:** gpt-image-2 doesn't support transparency — generated on white, masked in CSS, or accepted opaque |
| Favicons | Pre-provided | Drop in from `aryatech_logo_assets/` — no gpt-image-2 needed |

### Asset storage convention

```
public/generated/
  hero/
    hero-bg-mesh.webp
    hero-paper-plane.png
  portfolio/
    huntress-mockup.png
    watch-see-mockup.png
    urban-aid-mockup.png
  og/
    og-image-1200x630.jpg
  decorative/
    accent-orb-blue.png
    accent-orb-orange.png
  404/
    404-illustration.png
  mockups/
    (full-section mockups from gpt-image-2 — design archive, not served)
```

### Phase 4 acceptance criteria

- All listed assets generated and saved to `public/generated/`
- Each loads in the browser at the expected URL
- OG image validates via opengraph.xyz
- Favicons render in real browsers (Chrome, Safari, Firefox)
- File sizes reasonable (hero mesh ≤ 300 KB as WebP; portfolio mockups ≤ 200 KB each)

---

## 7. Cross-Cutting Concerns

### Domain + DNS migration

1. Deploy Phase 1 to preview URL first; validate; then point `ayra-tech.net` DNS to it.
2. Set up 301 redirect from `neuroforgetechnologies.net` → `ayra-tech.net` (preserve SEO equity).
3. `public/CNAME` updates in Phase 1.
4. `sitemap.xml`, `robots.txt` updates in Phase 1.
5. `vercel.json` and `.github/workflows/deploy.yml` are scanned for hardcoded domain references; if either currently deploys to `neuroforgetechnologies.net`, update the deploy target. Redirect rules from the old domain to the new live at the platform level (registrar or hosting provider), not in repo config — this is a manual user step.

**Out of scope:** registrar DNS configuration is a manual one-time step the user performs; this spec only prepares code/config to support it.

### SEO continuity

- Structured data (`SEO.jsx` + `index.html` JSON-LD): update `name`, `url`, `email`, `sameAs` — Phase 1.
- OG image: temp placeholder Phase 1, gpt-image-2 generated Phase 4.
- Canonical URLs: switch base to `ayra-tech.net` — Phase 1.
- Sitemap: regenerate with new URLs — Phase 1.
- 301s preserve search ranking during migration.

### Contact form routing

Currently Web3Forms (see `WEB3FORMS_SECURITY_SETUP.md`). Displayed emails change to founder addresses; the form's `access_key` stays the same. The **recipient configured in the Web3Forms dashboard** updates — this is a manual user step, not a code change.

The form UI in `Contact.jsx` will display both founder emails as alternative contact methods alongside the form.

### Testing strategy per phase

| Phase | Verification |
|---|---|
| 1 | `grep -ri "NeuroForge" src/ public/` empty; `npm run build` succeeds; homepage smoke test |
| 2 | `npm run dev` no console errors; visual palette scan per section |
| 3 (per section) | Mockup approved → implementation matches → responsive at 375/768/1280/1920 → Lighthouse perf check |
| 4 | Each asset loads; OG validated via opengraph.xyz; favicons render in real browsers |

### Backout plan

Each phase is one commit (or one PR per phase, per section for Phase 3). `git revert <commit>` rolls back any phase without affecting earlier ones. The phased approach IS the backout plan.

### Approval gates

- **Gate 1:** Phase 1 deployed → user confirms "I'm AryaTech now"
- **Gate 2:** Phase 2 deployed → user confirms colors look right
- **Gate 3a (per section in Phase 3):** mockup generated → user approves before code
- **Gate 3b (per section in Phase 3):** code implemented → user approves before next section
- **Gate 4:** All standalone assets generated → user approves final OG, mockups, etc.

---

## 8. Non-Goals (explicit)

- No new pages added (no blog, case-study deep dives, etc.)
- No backend / API changes
- No CMS introduction
- No multi-language support
- No analytics swap
- No team-photo regeneration (real photos stay)
- No content rewrite beyond name + tagline (Phase 1 only)
- No repositioning of the company narrative
- No DNS configuration at the registrar (manual user step)
- No Web3Forms recipient configuration (manual user step in Web3Forms dashboard)

---

## 9. Open Questions / Deferred Decisions

None blocking. All clarifying questions resolved during brainstorming:

- ✅ Brand spelling: AryaTech (display) / ayra-tech.net (domain)
- ✅ Copy scope: name + tagline only
- ✅ Tagline: `Intelligent Solutions, Secure Future.`
- ✅ Emails: jacobgonsalves@ + ethanhoover@
- ✅ Visual direction: Tech-forward gradient (Cursor/Anthropic vibe)
- ✅ Overhaul depth: full component-level redesign
- ✅ Sequencing: phased (Approach A)
- ✅ Designer: gpt-image-2 (MCP server) as design authority
- ✅ Section order: Hero first
- ✅ Mockup variants: 1 per section, iterate via edit-session

---

## 10. Next Steps

After user approval of this spec:

1. Invoke the `writing-plans` skill to produce a detailed phase-by-phase implementation plan with discrete, executable tasks.
2. Begin Phase 1 implementation.
