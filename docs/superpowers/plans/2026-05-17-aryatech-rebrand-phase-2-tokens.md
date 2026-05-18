# AryaTech Rebrand — Phase 2 (Design Tokens) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Swap the Tailwind color palette to AryaTech's royal-blue / navy / paper-plane-orange brand. Existing components automatically inherit — no JSX edits.

**Architecture:** `tailwind.config.js` color rewrite + `src/styles/index.css` token+utility updates. Each task is one commit.

**Tech Stack:** Tailwind 3.4, Vite, PostCSS, Inter (loaded), JetBrains Mono (registered in config but not yet imported in CSS).

**Spec:** `docs/superpowers/specs/2026-05-17-aryatech-rebrand-design.md` (Section 4 — Phase 2)

---

## Pre-Flight Reference

Current `tailwind.config.js` state (verified):
- `primary` scale = generic Tailwind blue (`#3b82f6` at 500)
- `accent` scale = amber/orange (`#f59e0b` at 400)
- No custom `neutral` scale (uses Tailwind built-in)
- `boxShadow.primary` uses RGB `(59, 130, 246)` — old blue
- `boxShadow.accent` uses RGB `(245, 158, 11)` — old amber
- `fontFamily.mono` already registers JetBrains Mono (but no `@import` exists yet)

Current `src/styles/index.css` state:
- Imports Inter only (`Inter:wght@400;500;600;700`)
- `.gradient-text` uses `from-primary-600 to-accent-500`
- `.glass` defined for light surfaces
- No `.glass-dark`, no `.bg-brand-mesh`, no `.font-mono` utility

---

### Task 1: Rewrite `tailwind.config.js` color scales + shadows

**Files:** Modify `tailwind.config.js`

- [ ] **Step 1: Replace the `primary` scale (lines 10-21)**

Use Edit tool. old_string:
```
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
```
new_string:
```
        primary: {
          50:  '#EEF3FF',
          100: '#D9E4FF',
          200: '#B5C9FF',
          300: '#85A4FF',
          400: '#527CFF',
          500: '#1E5BFF',
          600: '#1546D6',
          700: '#0F35A8',
          800: '#0B2A6B',
          900: '#070D33',
          950: '#050F33',
        },
```

- [ ] **Step 2: Replace the `accent` scale (lines 22-33)**

old_string:
```
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
```
new_string:
```
        accent: {
          50:  '#FFF5E6',
          100: '#FFE5BF',
          200: '#FFCC85',
          300: '#FFB04A',
          400: '#FF9A2E',
          500: '#FF8A1E',
          600: '#E66F00',
          700: '#B85800',
          800: '#8A4200',
          900: '#5C2D00',
        },
```

- [ ] **Step 3: Add `neutral` scale (insert after `accent` scale, before `},` closing `colors`)**

Find the line after the accent scale closes (`        },` on line ~33, with `      },` on line ~34 closing colors). Use Edit:

old_string:
```
        accent: {
          50:  '#FFF5E6',
          100: '#FFE5BF',
          200: '#FFCC85',
          300: '#FFB04A',
          400: '#FF9A2E',
          500: '#FF8A1E',
          600: '#E66F00',
          700: '#B85800',
          800: '#8A4200',
          900: '#5C2D00',
        },
      },
```
new_string:
```
        accent: {
          50:  '#FFF5E6',
          100: '#FFE5BF',
          200: '#FFCC85',
          300: '#FFB04A',
          400: '#FF9A2E',
          500: '#FF8A1E',
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
      },
```

- [ ] **Step 4: Update `boxShadow.primary` (line ~71)**

old_string: `        'primary': '0 10px 25px -5px rgba(59, 130, 246, 0.3)',`
new_string: `        'primary': '0 10px 25px -5px rgba(30, 91, 255, 0.3)',`

- [ ] **Step 5: Update `boxShadow.accent` (line ~72)**

old_string: `        'accent': '0 10px 25px -5px rgba(245, 158, 11, 0.3)',`
new_string: `        'accent': '0 10px 25px -5px rgba(255, 138, 30, 0.3)',`

- [ ] **Step 6: Verify**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && grep -c "1E5BFF\|FF8A1E\|F7F9FC\|rgba(30, 91, 255\|rgba(255, 138, 30" tailwind.config.js
```
Expected: `>= 5`.

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && grep -c "3b82f6\|f59e0b\|d97706\|rgba(59, 130, 246\|rgba(245, 158, 11" tailwind.config.js
```
Expected: `0`.

- [ ] **Step 7: Commit**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && git add tailwind.config.js && git commit -m "tailwind: rewrite primary/accent palettes to AryaTech brand, add neutral scale, update brand shadow RGB"
```

---

### Task 2: Update `src/styles/index.css` (font import + utilities)

**Files:** Modify `src/styles/index.css`

- [ ] **Step 1: Add JetBrains Mono import + extend Inter weights**

old_string:
```
/* Import Inter font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```
new_string:
```
/* Import brand fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
```

- [ ] **Step 2: Update `.gradient-text` to brand gradient**

old_string:
```
  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent;
  }
```
new_string:
```
  /* Gradient text — brand blue → navy → orange */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-500 via-primary-700 to-accent-500 bg-clip-text text-transparent;
  }
```

- [ ] **Step 3: Update `.glass` and add `.glass-dark`**

old_string:
```
  /* Glass effect */
  .glass {
    @apply bg-white/80 backdrop-blur-lg border border-neutral-200/50;
  }
```
new_string:
```
  /* Glass effect — light surfaces */
  .glass {
    @apply bg-white/70 backdrop-blur-lg border border-neutral-200/50;
  }

  /* Glass effect — dark surfaces (used over hero gradient) */
  .glass-dark {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }
```

- [ ] **Step 4: Add `.bg-brand-mesh` and `.font-mono` utilities at end of `@layer utilities`**

Find the closing `}` of the `@layer utilities` block (immediately after the `prefers-reduced-motion` media query closes). The current last utility is the `@media (prefers-reduced-motion: reduce)` block. Insert BEFORE the closing `}` of `@layer utilities`:

old_string:
```
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```
new_string:
```
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Brand mesh background — for hero / dark sections */
  .bg-brand-mesh {
    background:
      radial-gradient(circle at 20% 30%, rgba(30, 91, 255, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 138, 30, 0.25) 0%, transparent 50%),
      linear-gradient(135deg, #050F33 0%, #0B2A6B 100%);
  }

  /* Mono utility (paired with tailwind fontFamily.mono) */
  .font-mono {
    font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  }
}
```

- [ ] **Step 5: Verify**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && grep -c "JetBrains+Mono\|glass-dark\|bg-brand-mesh\|via-primary-700" src/styles/index.css
```
Expected: `>= 4`.

- [ ] **Step 6: Commit**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && git add src/styles/index.css && git commit -m "styles: add JetBrains Mono import, update gradient-text + glass to brand, add glass-dark + bg-brand-mesh"
```

---

### Task 3: Build + visual verification

**Files:** No file changes — verification only.

- [ ] **Step 1: Build**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && npm run build 2>&1 | tail -5
```

Expected: `✓ built in <N>s`. No errors.

- [ ] **Step 2: Browser visual check**

Refresh `http://localhost:3000/`. Confirm:
- Hero gradient blobs now render in **royal blue + orange** (not the old indigo + pink)
- The accent word "production" in the Hero subheadline is now in the **AryaTech orange**, not amber
- Header brand text and Footer text are still legible (neutral grays may have shifted to slightly cooler tone)
- CTAs ("Get in Touch", "View Our Work") now render in royal blue
- Service section check marks are now AryaTech orange
- No console errors

- [ ] **Step 3: Tag**

```bash
cd "C:/Users/jacob/OneDrive/Desktop/NeuroForge Technologies Website" && git tag -a rebrand/phase-2-tokens -m "Phase 2 complete: Tailwind palette + CSS utilities updated to AryaTech brand. Components untouched — they inherit new tokens automatically."
```

- [ ] **Step 4: Pause for Gate 2 approval**

User visits the dev server and confirms colors look right before Phase 3 begins.

---

## Self-Review checklist

- [ ] `tailwind.config.js` contains no old palette hex values (3b82f6, f59e0b, d97706) or old RGB tuples
- [ ] `tailwind.config.js` contains new brand hex values (1E5BFF, FF8A1E) and new `neutral` scale
- [ ] `src/styles/index.css` imports JetBrains Mono
- [ ] `.gradient-text`, `.glass`, `.glass-dark`, `.bg-brand-mesh`, `.font-mono` all present
- [ ] `npm run build` succeeds
- [ ] Visual confirmation in browser (hero blobs blue/orange, CTAs royal blue, check marks orange)
- [ ] Tag `rebrand/phase-2-tokens` exists

## Out of scope (Phase 2)

- Component JSX changes (Phase 3)
- New imagery (Phase 4)
- Any new sections or layouts

## Next

After Gate 2 approval: write Phase 3 plan (gpt-image-2-driven UI redesign, section by section).
