/* eslint-env node */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

// Full-page responsive captures for pre-launch visual QA across routes/breakpoints.
const base = process.argv[2] || 'http://localhost:3000';
const outDir = resolve('./public/generated/screenshots');
mkdirSync(outDir, { recursive: true });

const routes = [
  { path: '/', name: 'home' },
  { path: '/team', name: 'team' },
];
const widths = [375, 768, 1280, 1920];

const browser = await chromium.launch();
const overflowReport = [];

for (const route of routes) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 30000 });

    // Scroll through so reveal animations trigger before the full-page shot
    await page.evaluate(async () => {
      const total = document.body.scrollHeight;
      const step = Math.floor(window.innerHeight * 0.8);
      for (let y = 0; y <= total; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    overflowReport.push(`${route.name} @ ${width}px  overflow=${overflow}`);

    const out = resolve(outDir, `page-${route.name}-${width}.png`);
    await page.screenshot({ path: out, fullPage: true });
    await context.close();
  }
}

await browser.close();
console.log(overflowReport.join('\n'));
