import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const url = process.argv[2] || 'http://localhost:3000/';
const outPath = resolve(process.argv[3] || './public/generated/screenshots/bottom.png');
const viewport = { width: 1440, height: 900 };

mkdirSync(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

// Scroll the full page so reveals trigger
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  const vh = window.innerHeight;
  const step = Math.floor(vh * 0.8);
  for (let y = 0; y <= total; y += step) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 200));
  }
});

// Snap viewport at the very bottom (footer)
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await page.waitForTimeout(400);
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(JSON.stringify({ url, outPath, viewport }, null, 2));
