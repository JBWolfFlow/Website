import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const url = process.argv[2] || 'http://localhost:3000/';
const selector = process.argv[3] || '#services';
const outPath = resolve(process.argv[4] || './public/generated/screenshots/section.png');
const viewport = { width: 1440, height: 900 };

mkdirSync(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
const page = await context.newPage();

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

// Scroll the full page so all sections trigger their reveals
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  const vh = window.innerHeight;
  const step = Math.floor(vh * 0.8);
  for (let y = 0; y <= total; y += step) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 200));
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  await new Promise(r => setTimeout(r, 400));
});

const handle = await page.$(selector);
if (!handle) {
  console.error(JSON.stringify({ error: `Selector not found: ${selector}` }));
  await browser.close();
  process.exit(1);
}

// Scroll element into view honoring fixed-header offset.
// scrollIntoViewIfNeeded bypasses CSS scroll-margin-top, so do it manually.
const HEADER_OFFSET = 96; // matches CSS `scroll-margin-top: 6rem` on `section[id]`
await page.evaluate(({ sel, offset }) => {
  const el = document.querySelector(sel);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const target = rect.top + window.scrollY - offset;
  window.scrollTo({ top: target, behavior: 'instant' });
}, { sel: selector, offset: HEADER_OFFSET });
await page.waitForTimeout(500);
await handle.screenshot({ path: outPath });

await browser.close();
console.log(JSON.stringify({ url, selector, outPath, viewport }, null, 2));
