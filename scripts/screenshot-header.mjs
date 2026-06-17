/* eslint-env node */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

// Captures the floating header in both states (over the dark hero, and scrolled
// over the light sections) across responsive breakpoints, for visual QA.
const url = process.argv[2] || 'http://localhost:3000/';
const outDir = resolve('./public/generated/screenshots');
mkdirSync(outDir, { recursive: true });

const widths = [375, 768, 1280, 1920];

const browser = await chromium.launch();
const results = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // State 1: top of page, header floating over the dark hero
  await page.waitForTimeout(500);
  const topPath = resolve(outDir, `header-${width}-top.png`);
  await page.screenshot({ path: topPath, clip: { x: 0, y: 0, width, height: 140 } });
  results.push(topPath);

  // State 2: scrolled down over light sections (scroll-aware dark glass state)
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const scrolledPath = resolve(outDir, `header-${width}-scrolled.png`);
  await page.screenshot({ path: scrolledPath, clip: { x: 0, y: 0, width, height: 140 } });
  results.push(scrolledPath);

  // Horizontal-overflow check (the project has a history of mobile overflow bugs)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );

  await context.close();
  console.log(`${width}px  horizontal-overflow=${overflow}`);
}

await browser.close();
console.log(JSON.stringify({ shots: results.length }, null, 2));
