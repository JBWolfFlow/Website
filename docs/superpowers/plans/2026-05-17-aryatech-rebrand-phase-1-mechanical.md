# AryaTech Rebrand — Phase 1 (Mechanical) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mechanically rebrand the NeuroForge Technologies website to AryaTech — text, file, and binary asset swaps only. No component redesign, no color token changes, no new imagery beyond the provided logos and a temporary OG placeholder.

**Architecture:** Pure find/replace + drop-in binary assets. Existing component structure, Tailwind config, animations, and copy structure all preserved. Only changes: brand name, tagline, domain, founder emails, logo/favicon files, and SEO metadata.

**Tech Stack:** Vite 5, React 18, Tailwind CSS, react-helmet-async (for SEO), Web3Forms (contact form backend, unchanged).

**Spec:** `docs/superpowers/specs/2026-05-17-aryatech-rebrand-design.md` (Section 3 — Phase 1)

---

## Pre-Flight Reference

**Constants used throughout this plan** (refer back when implementing):

| Symbol | Value |
|---|---|
| `BRAND_NAME` | `AryaTech` |
| `BRAND_NAME_OLD` | `NeuroForge Technologies` |
| `BRAND_NAME_OLD_SHORT` | `NeuroForge` |
| `DOMAIN_NEW` | `ayra-tech.net` |
| `DOMAIN_OLD` | `neuroforgetechnologies.net` |
| `EMAIL_PRIMARY` | `jacobgonsalves@ayra-tech.net` |
| `EMAIL_SECONDARY` | `ethanhoover@ayra-tech.net` |
| `EMAIL_OLD` | `contact@neuroforgetechnologies.net` |
| `TAGLINE_NEW` | `Intelligent Solutions, Secure Future.` |
| `THEME_COLOR_NEW` | `#1E5BFF` |
| `LOGO_SOURCE_DIR` | `C:\Users\jacob\OneDrive\Desktop\Website Rebrand\aryatech_logo_assets\` |

**Description used in SEO/manifest (consolidating three current inconsistent variants):**
> `AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard.`

---

### Task 1: Copy AryaTech logo + favicon binary assets into `public/`

**Files:**
- Create: `public/logo.png`
- Create: `public/favicon.ico`
- Create: `public/apple-touch-icon.png`
- Create: `public/android-chrome-192x192.png`
- Create: `public/android-chrome-512x512.png`
- Create: `public/favicon-16x16.png`
- Create: `public/favicon-32x32.png`
- Delete: `public/logo.svg`

- [ ] **Step 1: Copy logo PNG**

Run (Bash):
```bash
cp "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_full_logo_transparent.png" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/logo.png"
```

- [ ] **Step 2: Copy favicon.ico**

Run:
```bash
cp "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/favicon.ico" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/favicon.ico"
```

- [ ] **Step 3: Generate sized PNG favicons from the 512px source**

Use the 512px favicon as the source for all PNG sizes. Run (Bash, with ImageMagick `magick` or `convert` if installed; otherwise use a Node one-liner with `sharp` if the project has it):

```bash
# Preferred (ImageMagick):
magick "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_favicon_512.png" -resize 16x16   "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/favicon-16x16.png"
magick "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_favicon_512.png" -resize 32x32   "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/favicon-32x32.png"
magick "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_favicon_512.png" -resize 180x180 "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/apple-touch-icon.png"
magick "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_favicon_512.png" -resize 192x192 "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/android-chrome-192x192.png"
cp     "C:/Users/jacob/OneDrive/Desktop/Website Rebrand/aryatech_logo_assets/aryatech_favicon_512.png"                  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/android-chrome-512x512.png"
```

**If `magick` is not installed:** fall back to using the existing source files — copy `aryatech_favicon_128.png` → `favicon-32x32.png` and `favicon-16x16.png` (browsers downscale fine); copy `aryatech_favicon_256.png` → `apple-touch-icon.png`; copy `aryatech_favicon_512.png` → both android-chrome icons. Note this in commit message.

- [ ] **Step 4: Delete the old logo.svg**

Run:
```bash
rm "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/logo.svg"
```

- [ ] **Step 5: Verify all expected files present**

Run:
```bash
ls "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/" | grep -E "logo\.png|favicon|apple-touch|android-chrome"
```

Expected output (order may vary):
```
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
logo.png
```

- [ ] **Step 6: Commit**

```bash
git add public/logo.png public/favicon.ico public/apple-touch-icon.png public/android-chrome-192x192.png public/android-chrome-512x512.png public/favicon-16x16.png public/favicon-32x32.png
git rm public/logo.svg
git commit -m "Install AryaTech logo + favicon assets"
```

---

### Task 2: Generate temporary Phase 1 OG image (logo on navy gradient)

**Files:**
- Create: `public/og-image.jpg` (replaces existing if present; if not present, creates new)

This is the temporary placeholder per spec Section 3. A polished gpt-image-2 OG image is generated in Phase 4.

- [ ] **Step 1: Generate via gpt-image-2**

Call `mcp__gpt-image-2__generate_image` with:
- `prompt`: `Social media preview card. Centered: the word "ARYATECH" in bold, modern, sans-serif typography, white color. Below the wordmark, a thinner subtitle: "Intelligent Solutions, Secure Future." in lighter weight white. Background: smooth diagonal gradient from royal blue (#1E5BFF) in the top-left to deep navy (#0B2A6B) in the bottom-right, with subtle orange (#FF8A1E) gradient mesh glow in the bottom-right corner. Clean, professional, minimal. No icons or other text. High-end SaaS aesthetic. 1200x630 pixels.`
- `size`: `1216x624` (closest valid size to 1200x630 — both dimensions are multiples of 16)
- `output_format`: `jpeg`
- `quality`: `high`
- `output_dir`: `C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/generated/og/`
- `filename_prefix`: `og-temp`

- [ ] **Step 2: Move generated file to final path**

The MCP response includes a `file_path` field in `structuredContent.images[0].file_path` — that's the exact saved path. Use that exact path (not a glob) to move the file. Example invocation pattern:

```bash
# Substitute <EXACT_PATH_FROM_MCP_RESPONSE> with the file_path returned by the previous step
mv "<EXACT_PATH_FROM_MCP_RESPONSE>" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/og-image.jpg"
```

If for any reason the exact path is unavailable, fall back to listing the directory and picking the most recent matching file:
```bash
ls -t "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/generated/og/" | head -1
```
Then move that file by its actual name.

- [ ] **Step 3: Verify**

```bash
ls -la "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/og-image.jpg"
```

File should exist, > 50 KB, < 500 KB.

- [ ] **Step 4: Commit**

```bash
git add public/og-image.jpg
git commit -m "Add temporary AryaTech OG image placeholder for Phase 1"
```

---

### Task 3: Update `package.json` metadata

**Files:**
- Modify: `package.json:2`

- [ ] **Step 1: Update the `name` field**

Edit `package.json` line 2:
- Old: `"name": "neuroforge-technologies-website",`
- New: `"name": "aryatech-website",`

- [ ] **Step 2: Regenerate package-lock.json (so the name change propagates)**

Run:
```bash
npm install --package-lock-only
```

Expected: lockfile updated, no errors.

- [ ] **Step 3: Verify**

Run (PowerShell):
```powershell
Select-String -Path package.json -Pattern '"name"' | Select-Object -First 1
Select-String -Path package-lock.json -Pattern '"name"' | Select-Object -First 1
```

Both should show `"name": "aryatech-website"`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Rename npm package to aryatech-website"
```

---

### Task 4: Update `src/data/siteConfig.js` (central source of truth)

This file is imported across many components. Updating it cascades to most user-facing copy without touching JSX.

**Files:**
- Modify: `src/data/siteConfig.js`

- [ ] **Step 1: Read current file to verify line content**

Already known from earlier read (lines 6–48). Confirm shape with:
```bash
head -50 "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/data/siteConfig.js"
```

- [ ] **Step 2: Replace the export object**

Use Edit tool with these replacements:

| Old | New |
|---|---|
| `name: 'NeuroForge Technologies',` | `name: 'AryaTech',` |
| `tagline: 'Engineering production software across desktop, web, and mobile.',` | `tagline: 'Intelligent Solutions, Secure Future.',` |
| `description: 'NeuroForge Technologies is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard.',` | `description: 'AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard.',` |
| `url: 'https://neuroforgetechnologies.net',` | `url: 'https://ayra-tech.net',` |
| `email: 'contact@neuroforgetechnologies.net',` | `email: 'jacobgonsalves@ayra-tech.net',` |
| `author: 'NeuroForge Technologies',` | `author: 'AryaTech',` |

Also **add** a new `secondaryEmail` field below `email`:
```js
email: 'jacobgonsalves@ayra-tech.net',
secondaryEmail: 'ethanhoover@ayra-tech.net',
```

- [ ] **Step 3: Verify**

```bash
grep -c "NeuroForge\|neuroforge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/data/siteConfig.js"
```

Expected: `0`.

```bash
grep -c "AryaTech\|ayra-tech\.net" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/data/siteConfig.js"
```

Expected: >= `5`.

- [ ] **Step 4: Commit**

```bash
git add src/data/siteConfig.js
git commit -m "siteConfig: rebrand to AryaTech, add secondary founder email"
```

---

### Task 5: Update `index.html` (title, meta, OG, Twitter, favicon refs, theme color)

**Files:**
- Modify: `index.html`

Current file has THREE inconsistent issues:
1. Tagline says "Crafting Digital Excellence" (not the real positioning)
2. Description is generic "Professional web development agency" boilerplate (doesn't match SEO.jsx or siteConfig.js)
3. theme-color is `#2563eb` (inconsistent with SEO.jsx's `#3b82f6`)

Phase 1 normalizes all three to the AryaTech brand.

- [ ] **Step 1: Update favicon `link` references**

Edit line 14:
- Old: `<link rel="icon" type="image/svg+xml" href="/logo.svg" />`
- New: `<link rel="icon" type="image/x-icon" href="/favicon.ico" />`

(Lines 15–17 referencing favicon-32x32, favicon-16x16, apple-touch-icon stay as-is — those paths are now populated by Task 1.)

- [ ] **Step 2: Update `<title>` and primary meta tags (lines 23–27)**

Replace lines 23–27:
- Old:
```html
<title>NeuroForge Technologies - Crafting Digital Excellence</title>
<meta name="title" content="NeuroForge Technologies - Crafting Digital Excellence" />
<meta name="description" content="Professional web development agency specializing in modern, high-performance websites and digital solutions." />
<meta name="keywords" content="web development, digital agency, react development, modern websites, UI/UX design" />
<meta name="author" content="NeuroForge Technologies" />
```
- New:
```html
<title>AryaTech — Intelligent Solutions, Secure Future</title>
<meta name="title" content="AryaTech — Intelligent Solutions, Secure Future" />
<meta name="description" content="AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard." />
<meta name="keywords" content="AI orchestration, bug bounty platform, watch marketplace, civic tech, React Native, Rust engineering, mobile development, SwiftUI iOS, production software engineering, Temple TX" />
<meta name="author" content="AryaTech" />
```

- [ ] **Step 3: Update Open Graph tags (lines 30–34)**

Replace lines 30–34:
- Old:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://neuroforgetechnologies.net/" />
<meta property="og:title" content="NeuroForge Technologies - Crafting Digital Excellence" />
<meta property="og:description" content="Professional web development agency specializing in modern, high-performance websites and digital solutions." />
<meta property="og:image" content="/og-image.jpg" />
```
- New:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ayra-tech.net/" />
<meta property="og:title" content="AryaTech — Intelligent Solutions, Secure Future" />
<meta property="og:description" content="AryaTech is an engineering company shipping production software across desktop, web, and mobile." />
<meta property="og:image" content="/og-image.jpg" />
```

- [ ] **Step 4: Update Twitter tags (lines 37–41)**

Replace lines 37–41:
- Old:
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://neuroforgetechnologies.net/" />
<meta property="twitter:title" content="NeuroForge Technologies - Crafting Digital Excellence" />
<meta property="twitter:description" content="Professional web development agency specializing in modern, high-performance websites and digital solutions." />
<meta property="twitter:image" content="/og-image.jpg" />
```
- New:
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://ayra-tech.net/" />
<meta property="twitter:title" content="AryaTech — Intelligent Solutions, Secure Future" />
<meta property="twitter:description" content="AryaTech is an engineering company shipping production software across desktop, web, and mobile." />
<meta property="twitter:image" content="/og-image.jpg" />
```

- [ ] **Step 5: Update theme-color (line 46)**

- Old: `<meta name="theme-color" content="#2563eb" />`
- New: `<meta name="theme-color" content="#1E5BFF" />`

- [ ] **Step 6: Verify zero NeuroForge / old-domain references remain**

```bash
grep -ci "neuroforge\|neuroforgetechnologies" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/index.html"
```

Expected: `0`.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "index.html: rebrand to AryaTech, fix tagline + description inconsistencies"
```

---

### Task 6: Update `src/components/common/SEO.jsx` (defaults + JSON-LD structured data)

**Files:**
- Modify: `src/components/common/SEO.jsx`

- [ ] **Step 1: Update default prop values (lines 10–17)**

Replace the default values:
- `title`: `'NeuroForge Technologies | AI-Powered Software Solutions'` → `'AryaTech — Intelligent Solutions, Secure Future'`
- `description`: `'NeuroForge Technologies delivers cutting-edge AI systems, custom software development, and intelligent automation solutions. From web and mobile apps to desktop applications and machine learning pipelines — we engineer the future.'` → `'AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile. We build our own product portfolio — Huntress, Watch & See, and Urban Aid — and partner with companies that need software built to a production standard.'`
- `keywords`: `'AI development, machine learning, custom software, web development, mobile apps, desktop applications, automation systems, React, Python, artificial intelligence, software engineering, Temple TX'` → `'AI orchestration, bug bounty platform, watch marketplace, civic tech, React Native, Rust engineering, mobile development, SwiftUI iOS, production software engineering, Temple TX'`
- `url`: `'https://neuroforgetechnologies.net'` → `'https://ayra-tech.net'`
- `author`: `'NeuroForge Technologies'` → `'AryaTech'`

- [ ] **Step 2: Update `organizationData` (lines 19–52)**

Replace all NeuroForge references and fix the fake phone:
- `name: 'NeuroForge Technologies'` → `name: 'AryaTech'`
- `alternateName: 'NeuroForge'` → `alternateName: 'AryaTech'` (the alt is now the same; safe to keep the field for schema completeness)
- `logo: \`${url}/logo.svg\`` → `logo: \`${url}/logo.png\``
- `email: 'contact@neuroforgetechnologies.net'` → `email: 'jacobgonsalves@ayra-tech.net'`
- **Remove the fake phone number** (`telephone: '+1-555-123-4567'`) — delete that line, and delete `contactOption: 'TollFree'` since it required a real number.
- Leave `address`, `aggregateRating` as-is for now (not part of name/tagline scope — flag for Phase 3 review).

- [ ] **Step 3: Update `localBusinessData` (lines 54–85)**

- `name: 'NeuroForge Technologies'` → `name: 'AryaTech'`
- Delete `telephone: '+1-555-123-4567'` line (fake placeholder).
- `email: 'contact@neuroforgetechnologies.net'` → `email: 'jacobgonsalves@ayra-tech.net'`

- [ ] **Step 4: Update `websiteData` (lines 88–107)**

- `name: 'NeuroForge Technologies'` → `name: 'AryaTech'`
- `publisher.name: 'NeuroForge Technologies'` → `publisher.name: 'AryaTech'`
- `publisher.logo.url: \`${url}/logo.svg\`` → `publisher.logo.url: \`${url}/logo.png\``

- [ ] **Step 5: Update `serviceData` (lines 110–160)**

- `provider.name: 'NeuroForge Technologies'` → `provider.name: 'AryaTech'`

- [ ] **Step 6: Update `og:site_name` and theme-color in the JSX (lines 182, 200, 201)**

- `<meta property="og:site_name" content="NeuroForge Technologies" />` → `<meta property="og:site_name" content="AryaTech" />`
- `<meta name="theme-color" content="#3b82f6" />` → `<meta name="theme-color" content="#1E5BFF" />`
- `<meta name="msapplication-TileColor" content="#3b82f6" />` → `<meta name="msapplication-TileColor" content="#1E5BFF" />`

- [ ] **Step 7: Verify**

```bash
grep -c "NeuroForge\|neuroforge\|555-123-4567" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/common/SEO.jsx"
```

Expected: `0`.

```bash
grep -c "AryaTech\|ayra-tech\.net" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/common/SEO.jsx"
```

Expected: >= `10`.

- [ ] **Step 8: Commit**

```bash
git add src/components/common/SEO.jsx
git commit -m "SEO: rebrand defaults + structured data to AryaTech, remove fake phone placeholder"
```

---

### Task 7: Update `src/components/layout/Header.jsx`

**Files:**
- Modify: `src/components/layout/Header.jsx`

- [ ] **Step 1: Read the file to locate all NeuroForge / logo.svg references**

```bash
grep -n "NeuroForge\|neuroforge\|logo\.svg\|logo\.png" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/layout/Header.jsx"
```

- [ ] **Step 2: Replace all `NeuroForge Technologies` → `AryaTech` and `NeuroForge` → `AryaTech`**

Use Edit with `replace_all: true` if both standalone and full-name variants exist; otherwise use targeted replacements.

- [ ] **Step 3: Replace `/logo.svg` → `/logo.png`**

Edit any `src="/logo.svg"` reference to `src="/logo.png"`.

- [ ] **Step 4: Verify**

```bash
grep -c "NeuroForge\|neuroforge\|logo\.svg" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/layout/Header.jsx"
```

Expected: `0`.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.jsx
git commit -m "Header: rebrand to AryaTech, update logo path to PNG"
```

---

### Task 8: Update `src/components/layout/Footer.jsx`

**Files:**
- Modify: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Locate references**

```bash
grep -n "NeuroForge\|neuroforge\|logo\.svg\|contact@neuroforge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/layout/Footer.jsx"
```

- [ ] **Step 2: Replace brand name references**

`NeuroForge Technologies` → `AryaTech`, `NeuroForge` → `AryaTech`. Update copyright line if present (e.g., `© 2024 NeuroForge Technologies` → `© 2026 AryaTech`).

- [ ] **Step 3: Replace logo path**

`/logo.svg` → `/logo.png` (if used in Footer).

- [ ] **Step 4: Replace email references**

`contact@neuroforgetechnologies.net` → `jacobgonsalves@ayra-tech.net`. If both founder emails should be shown, add `ethanhoover@ayra-tech.net` alongside (use a list/comma-separated display matching Footer's existing style).

- [ ] **Step 5: Verify**

```bash
grep -c "NeuroForge\|neuroforge\|logo\.svg\|contact@neuroforge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/layout/Footer.jsx"
```

Expected: `0`.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "Footer: rebrand to AryaTech, update logo + founder emails"
```

---

### Task 9: Update `src/components/sections/Hero.jsx`

**Files:**
- Modify: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Locate references**

```bash
grep -n "NeuroForge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/Hero.jsx"
```

Expected hits: 3 (subheadline line 204, subheadline line 275, aria-label lines 216 + 291).

- [ ] **Step 2: Update subheadline copy in both mobile (line ~204) and desktop (line ~275) branches**

Replace `NeuroForge Technologies engineers software` with `AryaTech engineers software`. The rest of the subheadline stays exactly the same (per spec: keep positioning).

Use Edit with `replace_all: true` for the literal string `NeuroForge Technologies engineers software`.

- [ ] **Step 3: Update aria-labels**

Replace `aria-label="Get in touch with NeuroForge Technologies"` → `aria-label="Get in touch with AryaTech"` (both mobile + desktop branches; use `replace_all: true`).

- [ ] **Step 4: Verify**

```bash
grep -c "NeuroForge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/Hero.jsx"
```

Expected: `0`.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.jsx
git commit -m "Hero: rebrand to AryaTech in subheadline + aria-labels"
```

---

### Task 10: Update `src/components/sections/About.jsx`

**Files:**
- Modify: `src/components/sections/About.jsx`

- [ ] **Step 1: Locate references**

```bash
grep -n "NeuroForge\|neuroforge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/About.jsx"
```

- [ ] **Step 2: Replace brand name references**

`NeuroForge Technologies` → `AryaTech` and standalone `NeuroForge` → `AryaTech`. Use Edit with `replace_all: true` for each variant.

- [ ] **Step 3: Verify**

```bash
grep -c "NeuroForge\|neuroforge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/About.jsx"
```

Expected: `0`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.jsx
git commit -m "About: rebrand to AryaTech"
```

---

### Task 11: Update `src/components/sections/Contact.jsx`

**Files:**
- Modify: `src/components/sections/Contact.jsx`

This file gets BOTH founder emails displayed (spec change — currently shows one).

- [ ] **Step 1: Locate references**

```bash
grep -n "NeuroForge\|neuroforge\|contact@neuroforge\|email" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/Contact.jsx"
```

- [ ] **Step 2: Replace brand name references**

`NeuroForge Technologies` → `AryaTech` and `NeuroForge` → `AryaTech` (replace_all).

- [ ] **Step 3: Replace email reference**

If the file currently displays `contact@neuroforgetechnologies.net` directly (as a `mailto:` or plain text), replace with the primary founder email `jacobgonsalves@ayra-tech.net`. If the file imports from `siteConfig.email`, no change needed (Task 4 updated siteConfig).

- [ ] **Step 4: Add secondary email display**

If the contact section shows a single email, add a second line showing `ethanhoover@ayra-tech.net` with a label like "or" or "Co-founder:". Match the existing styling pattern in the file (look at how the existing email is rendered and duplicate that JSX, swapping the address).

If the existing import is `import { siteConfig } from '@data/siteConfig'`, the new field `siteConfig.secondaryEmail` (added in Task 4) is available.

- [ ] **Step 5: Verify**

```bash
grep -c "NeuroForge\|neuroforge\|neuroforgetechnologies" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/sections/Contact.jsx"
```

Expected: `0`.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Contact.jsx
git commit -m "Contact: rebrand to AryaTech, display both founder emails"
```

---

### Task 12: Update remaining `src/` files (Team, Careers, Privacy, Terms, Cookie, team.js, formService.js)

**Files:**
- Modify: `src/components/pages/Team.jsx`
- Modify: `src/components/pages/Careers.jsx`
- Modify: `src/components/legal/PrivacyPolicy.jsx`
- Modify: `src/components/legal/TermsOfService.jsx`
- Modify: `src/components/legal/CookiePolicy.jsx`
- Modify: `src/data/team.js`
- Modify: `src/services/formService.js`

These are mechanical brand-name swaps with no structural changes.

- [ ] **Step 1: For each file in the list, run the same find/replace pattern**

For each path, use Edit with `replace_all: true`:
- `NeuroForge Technologies` → `AryaTech`
- `NeuroForge` → `AryaTech`
- `neuroforgetechnologies.net` → `ayra-tech.net`
- `contact@neuroforgetechnologies.net` → `jacobgonsalves@ayra-tech.net`

Do this file by file (7 files total). Each is its own Edit call.

- [ ] **Step 2: Verify all 7 files are clean**

```bash
grep -ci "NeuroForge\|neuroforge" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/pages/Team.jsx" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/pages/Careers.jsx" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/legal/PrivacyPolicy.jsx" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/legal/TermsOfService.jsx" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/components/legal/CookiePolicy.jsx" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/data/team.js" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/src/services/formService.js"
```

Every file should show `0`.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/Team.jsx src/components/pages/Careers.jsx src/components/legal/PrivacyPolicy.jsx src/components/legal/TermsOfService.jsx src/components/legal/CookiePolicy.jsx src/data/team.js src/services/formService.js
git commit -m "Rebrand Team/Careers/legal pages/team data/formService to AryaTech"
```

---

### Task 13: Update `public/manifest.json`

**Files:**
- Modify: `public/manifest.json`

Current file has generic "Professional web development agency" description and `#2563eb` theme color. Normalize to AryaTech.

- [ ] **Step 1: Replace `name` (line 2)**

- Old: `"name": "NeuroForge Technologies - Premium Web Development Agency",`
- New: `"name": "AryaTech — Intelligent Solutions, Secure Future",`

- [ ] **Step 2: Replace `short_name` (line 3)**

- Old: `"short_name": "NeuroForge",`
- New: `"short_name": "AryaTech",`

- [ ] **Step 3: Replace `description` (line 4)**

- Old: `"description": "Professional web development, mobile apps, and custom software solutions. Modern, scalable, and pixel-perfect digital experiences.",`
- New: `"description": "AryaTech is an engineering company designing and shipping production software across desktop, web, and mobile.",`

- [ ] **Step 4: Replace `theme_color` (line 8)**

- Old: `"theme_color": "#2563eb",`
- New: `"theme_color": "#1E5BFF",`

- [ ] **Step 5: Verify**

```bash
grep -c "NeuroForge\|neuroforge\|2563eb" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/manifest.json"
```

Expected: `0`.

- [ ] **Step 6: Commit**

```bash
git add public/manifest.json
git commit -m "manifest.json: rebrand to AryaTech, update theme color"
```

---

### Task 14: Update remaining `public/` files (CNAME, sitemap.xml, robots.txt, security.txt, 404.html, _headers)

**Files:**
- Modify: `public/CNAME`
- Modify: `public/sitemap.xml`
- Modify: `public/robots.txt`
- Modify: `public/.well-known/security.txt`
- Modify: `public/404.html`
- Modify: `public/_headers`

- [ ] **Step 1: Update CNAME**

Overwrite contents to single line: `ayra-tech.net`

```bash
echo "ayra-tech.net" > "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/CNAME"
```

- [ ] **Step 2: Update sitemap.xml**

Use Edit with `replace_all: true` to replace all instances of `neuroforgetechnologies.net` → `ayra-tech.net` and any `NeuroForge` brand references → `AryaTech`.

- [ ] **Step 3: Update robots.txt**

Use Edit with `replace_all: true` for the same patterns.

- [ ] **Step 4: Update security.txt**

Replace contact email: `contact@neuroforgetechnologies.net` → `jacobgonsalves@ayra-tech.net`. Replace domain refs to `ayra-tech.net`. Replace any brand name references to `AryaTech`.

- [ ] **Step 5: Update 404.html**

Use Edit with `replace_all: true` for brand name + domain references.

- [ ] **Step 6: Update _headers**

Use Edit with `replace_all: true` for domain references if any are hard-coded.

- [ ] **Step 7: Verify**

```bash
grep -ci "NeuroForge\|neuroforge" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/CNAME" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/sitemap.xml" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/robots.txt" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/.well-known/security.txt" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/404.html" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/public/_headers"
```

Every file should show `0`.

- [ ] **Step 8: Commit**

```bash
git add public/CNAME public/sitemap.xml public/robots.txt public/.well-known/security.txt public/404.html public/_headers
git commit -m "Rebrand public/ config files to AryaTech + ayra-tech.net domain"
```

---

### Task 15: Update root config files (`.env.example`, `vercel.json`, `.htaccess`, `nginx-security.conf`, `.github/workflows/deploy.yml`)

**Files:**
- Modify: `.env.example`
- Modify: `vercel.json`
- Modify: `.htaccess`
- Modify: `nginx-security.conf`
- Modify: `.github/workflows/deploy.yml`

- [ ] **Step 1: For each file, run the same find/replace pattern**

Use Edit with `replace_all: true` for each path:
- `NeuroForge Technologies` → `AryaTech`
- `NeuroForge` → `AryaTech`
- `neuroforgetechnologies.net` → `ayra-tech.net`
- `contact@neuroforgetechnologies.net` → `jacobgonsalves@ayra-tech.net`

- [ ] **Step 2: Manual review of `deploy.yml`**

After find/replace, open `.github/workflows/deploy.yml` and verify:
- The deploy target / `cname` step uses `ayra-tech.net`
- Any `actions/configure-pages` or similar step uses the new domain

If a `cname` field or `CNAME` reference exists, ensure it reads `ayra-tech.net`.

- [ ] **Step 3: Verify**

```bash
grep -ci "NeuroForge\|neuroforge" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/.env.example" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/vercel.json" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/.htaccess" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/nginx-security.conf" \
  "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/.github/workflows/deploy.yml"
```

Every file should show `0`.

- [ ] **Step 4: Commit**

```bash
git add .env.example vercel.json .htaccess nginx-security.conf .github/workflows/deploy.yml
git commit -m "Rebrand root config files to AryaTech + ayra-tech.net"
```

---

### Task 16: Update all root markdown docs (find/replace)

**Files:**
- Modify: `README.md`
- Modify: `ARCHITECTURE.md`
- Modify: `ABOUT_IMPLEMENTATION_SUMMARY.md`
- Modify: `CUSTOMIZATION_GUIDE.md`
- Modify: `DEPLOYMENT_GUIDE.md`
- Modify: `FORM_BACKEND_SETUP.md`
- Modify: `GITHUB_PAGES_DEPLOYMENT.md`
- Modify: `IMPLEMENTATION_GUIDE.md`
- Modify: `MAINTENANCE_GUIDE.md`
- Modify: `PORTFOLIO_IMPLEMENTATION_SUMMARY.md`
- Modify: `PRODUCTION_SECURITY_CHECKLIST.md`
- Modify: `QUICK_START_GITHUB_PAGES.md`
- Modify: `SECURITY_AUDIT.md`
- Modify: `SECURITY_FIXES_SUMMARY.md`
- Modify: `SECURITY_HARDENING_GUIDE.md`
- Modify: `SECURITY_IMPLEMENTATION_SUMMARY.md`
- Modify: `SECURITY_IMPLEMENTATION.md`
- Modify: `SECURITY_README.md`
- Modify: `SEO_PERFORMANCE_IMPLEMENTATION_SUMMARY.md`
- Modify: `SQUARESPACE_DEPLOYMENT.md`
- Modify: `TESTING_CHECKLIST.md`
- Modify: `WEB3FORMS_SECURITY_SETUP.md`

- [ ] **Step 1: For each .md file at repo root, apply the same find/replace via Edit (`replace_all: true`)**

Pattern (apply all four to each file):
- `NeuroForge Technologies` → `AryaTech`
- `NeuroForge` → `AryaTech`
- `neuroforgetechnologies.net` → `ayra-tech.net`
- `contact@neuroforgetechnologies.net` → `jacobgonsalves@ayra-tech.net`

This is repetitive but mechanical. **Do not skip docs you haven't read** — Edit will fail if the literal isn't present, which safely indicates that file has no reference and can be ignored.

- [ ] **Step 2: Verify all 22 root .md files are clean (excluding the spec doc, which is design history)**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
grep -liE "NeuroForge|neuroforge" *.md
```

Expected output: empty (no files listed). If any are listed, re-edit them.

- [ ] **Step 3: Verify the spec doc is unchanged (it intentionally references the old name in history)**

```bash
grep -c "NeuroForge" "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website/docs/superpowers/specs/2026-05-17-aryatech-rebrand-design.md"
```

Expected: `>= 1` (this is correct — spec references the old name for migration context).

- [ ] **Step 4: Commit**

```bash
git add README.md *.md
git commit -m "Rebrand all root markdown docs to AryaTech"
```

---

### Task 17: Final verification — zero NeuroForge references in shipped code

**Files:** No file changes; pure verification.

- [ ] **Step 1: Comprehensive grep across `src/`, `public/`, `index.html`, root configs, root docs**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
grep -rli --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=docs --exclude=package-lock.json "NeuroForge\|neuroforge"
```

Expected: empty output.

If anything is listed (excluding `docs/superpowers/specs/`), go back to the relevant task and complete the find/replace.

- [ ] **Step 2: Verify no `logo.svg` references remain**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
grep -rli --exclude-dir=node_modules --exclude-dir=.git "logo\.svg"
```

Expected: empty (or only the spec doc).

- [ ] **Step 3: Verify build succeeds**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
npm run build
```

Expected: build completes with no errors. Asset warnings (size, etc.) are acceptable.

- [ ] **Step 4: Verify dev server runs and renders**

If dev server from earlier in the session (Bash ID `bsnq55atb`) is still running, Vite hot-reloads — no restart needed. Otherwise:

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
npm run dev
```

Then in the browser at `http://localhost:3000`:
1. Browser tab favicon = AryaTech "A" mark (not the old logo)
2. Page title = `AryaTech — Intelligent Solutions, Secure Future`
3. Header shows AryaTech logo (not NeuroForge)
4. Hero subheadline says "AryaTech engineers software..." (not NeuroForge)
5. Footer says AryaTech (not NeuroForge), shows both founder emails
6. View-source: meta tags, og:title, og:url all reference AryaTech / ayra-tech.net
7. Open DevTools console — no errors (warnings acceptable)
8. Navigate to /404 fallback — page loads, says AryaTech

- [ ] **Step 5: Smoke-test the OG image**

In the browser, open `http://localhost:3000/og-image.jpg` — should display the generated AryaTech placeholder card (royal blue → navy gradient with "ARYATECH" wordmark).

- [ ] **Step 6: No commit — verification only.**

---

### Task 18: Tag the Phase 1 milestone

**Files:** No file changes; pure git tag.

- [ ] **Step 1: Tag the current HEAD**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website"
git tag -a rebrand/phase-1-mechanical -m "Phase 1 complete: NeuroForge → AryaTech mechanical rebrand. Text/file/binary swaps only. Tokens, components, and imagery untouched."
```

- [ ] **Step 2: Verify tag**

```bash
git tag -l "rebrand/*"
```

Expected: `rebrand/phase-1-mechanical`.

- [ ] **Step 3: STOP and confirm Gate 1 with user**

Phase 1 is now complete on `main` and tagged. Per spec Section 7 ("Approval gates"), pause here and ask the user to visit the running dev server, confirm "I'm AryaTech now," and approve before Phase 2 work begins.

---

## Self-Review

After completing all tasks, the following must be true:

- [ ] `grep -rli "NeuroForge\|neuroforge"` across the repo (excluding `node_modules/`, `.git/`, `docs/`, `package-lock.json`) returns no matches.
- [ ] `npm run build` succeeds with no errors.
- [ ] `npm run dev` loads `localhost:3000` with no console errors.
- [ ] Browser tab favicon is the AryaTech "A" mark.
- [ ] Page `<title>` reads `AryaTech — Intelligent Solutions, Secure Future`.
- [ ] All Hero / About / Services / Portfolio / Contact / Footer references display `AryaTech`.
- [ ] Contact and Footer display both founder emails.
- [ ] View-source confirms all OG / Twitter / JSON-LD structured data reference AryaTech + `ayra-tech.net`.
- [ ] `og-image.jpg` exists at `/og-image.jpg`, displays the placeholder card.
- [ ] Git tag `rebrand/phase-1-mechanical` exists.
- [ ] User has approved Gate 1 before any Phase 2 work begins.

---

## Out of Scope (Phase 1)

- Tailwind color tokens (Phase 2 plan)
- Component visual redesign (Phase 3 plan)
- gpt-image-2 section mockups (Phase 3 plan)
- Standalone non-OG imagery — hero mesh, portfolio mockups, 404 illustration, decorative orbs (Phase 4 plan)
- Domain DNS configuration at the registrar (manual user step)
- Web3Forms dashboard email recipient update (manual user step)

## Next

After Gate 1 approval: invoke `writing-plans` skill to draft `2026-05-17-aryatech-rebrand-phase-2-tokens.md`.
