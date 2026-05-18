import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const url = process.argv[2] || 'http://localhost:3000/';
const outPath = resolve(process.argv[3] || './public/generated/screenshots/home-desktop.png');
const viewport = { width: 1440, height: 900 };
const fullPage = process.argv[4] !== 'viewport';

mkdirSync(dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
const page = await context.newPage();

const logs = [];
page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(500);

// Scroll the full page in steps so Framer Motion + IntersectionObserver
// reveals (opacity:0 → 1, staggered fades) actually trigger before the snap.
// Without this, mid-page sections render as blank white space.
if (fullPage) {
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const step = Math.floor(viewportHeight * 0.8);
    for (let y = 0; y <= totalHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 250));
    }
    // Hold at bottom briefly, then back to top so screenshot starts from origin.
    await new Promise(r => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 400));
  });
}

await page.screenshot({ path: outPath, fullPage });

await browser.close();

console.log(JSON.stringify({
  url,
  outPath,
  viewport,
  fullPage,
  consoleLogs: logs,
}, null, 2));
