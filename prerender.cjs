/*
 * prerender.cjs — AskDeepak (NeuraScaleX)
 * After `npm run build`, opens the built site in a hidden browser, waits for React
 * to draw the page, and saves that finished HTML inside <div id="root"> in
 * dist/index.html. React still loads and takes over as normal.
 * Run:   npm run build && node prerender.cjs
 * Needs: npm install --save-dev playwright && npx playwright install chromium
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const DIST = path.resolve(process.argv[2] || 'dist');
const PORT = 4173;
const WAIT_FOR = '#root h1';

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

(async () => {
  const indexFile = path.join(DIST, 'index.html');
  const original = fs.readFileSync(indexFile, 'utf8');
  if (!original.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div>. Already prerendered? Run "npm run build" first.');
  }

  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(DIST, p);
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.statusCode = 404; return res.end();
    }
    res.setHeader('Content-Type', TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  }).listen(PORT);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  // Block analytics so the build never sends fake visits
  await page.route(/googletagmanager\.com|google-analytics\.com|clarity\.ms/, (route) => route.abort());
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector(WAIT_FOR, { timeout: 20000 });

  const rootHtml = await page.$eval('#root', (el) => el.innerHTML);
  await browser.close();
  server.close();

  const output = original.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
  fs.writeFileSync(indexFile, output);
  const words = rootHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`Prerender done: about ${words} words of page text saved into ${indexFile}`);
  if (words < 500) console.warn('WARNING: fewer than 500 words captured. Check the page finished loading.');
})().catch((err) => { console.error(err); process.exit(1); });
