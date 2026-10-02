#!/usr/bin/env node
/**
 * Checks every internal link on the built site: it crawls from the home page and the sitemap,
 * requests each internal URL once, and verifies that `#fragment` links point at an element id that
 * exists on the target page. External links are not checked (they fail for reasons outside this
 * repository and would make CI flaky).
 *
 * Usage: start the production server, then run
 *   BASE_URL=http://127.0.0.1:3000 node scripts/check-links.mjs
 * Absolute links to SITE_URL (default http://localhost:3000, as in lib/site-url.ts) count as internal.
 * Uses only Node.js built-ins (fetch needs Node 18 or newer).
 */

const base = new URL(process.env.BASE_URL ?? 'http://127.0.0.1:3000');
const siteOrigin = new URL(process.env.SITE_URL || 'http://localhost:3000').origin;
const internalOrigins = new Set([base.origin, siteOrigin]);

/** Pages whose HTML has been fetched: path -> { status, ids } */
const pages = new Map();
/** Links found: target URL (path + hash) -> set of pages that contain it */
const links = new Map();

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

/** Returns the internal URL for an href, or undefined for external and non-HTTP links. */
function toInternal(href, from) {
  if (/^(mailto|tel|javascript|data):/i.test(href)) return undefined;
  let url;
  try {
    url = new URL(href, new URL(from, base));
  } catch {
    return undefined;
  }
  if (!internalOrigins.has(url.origin)) return undefined;
  return new URL(url.pathname + url.search + url.hash, base);
}

async function fetchPage(path) {
  if (pages.has(path)) return pages.get(path);
  const response = await fetch(new URL(path, base), { redirect: 'follow' });
  const type = response.headers.get('content-type') ?? '';
  const html = type.includes('text/html') ? await response.text() : '';
  const ids = new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => decodeEntities(match[1])),
  );
  const page = { status: response.status, html, ids };
  pages.set(path, page);
  return page;
}

function recordLinks(path, html) {
  for (const match of html.matchAll(/<(?:a|link)\s[^>]*?href="([^"]*)"/g)) {
    const url = toInternal(decodeEntities(match[1]), path);
    if (!url) continue;
    const key = url.pathname + url.search + url.hash;
    if (!links.has(key)) links.set(key, new Set());
    links.get(key).add(path);
  }
}

async function crawl() {
  const queue = ['/'];
  const sitemap = await fetch(new URL('/sitemap.xml', base)).then((response) => response.text());
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = toInternal(match[1], '/');
    if (url) queue.push(url.pathname);
  }

  const seen = new Set();
  while (queue.length > 0) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const page = await fetchPage(path);
    if (!page.html) continue;
    recordLinks(path, page.html);
    for (const target of links.keys()) {
      const targetPath = target.split('#')[0];
      // Follow pages that render HTML; machine-readable routes are only checked for status.
      if (!seen.has(targetPath) && !/\.(md|txt|xml|png|svg|ico|json)$/.test(targetPath)) {
        queue.push(targetPath);
      }
    }
  }
}

async function validate() {
  const problems = [];
  for (const [target, sources] of links) {
    const [path, fragment] = target.split('#');
    const page = await fetchPage(path);
    let reason;
    if (page.status >= 400) reason = `HTTP ${page.status}`;
    else if (fragment && page.html && !page.ids.has(decodeURIComponent(fragment))) {
      reason = `no element with id "${decodeURIComponent(fragment)}"`;
    }
    if (reason) problems.push({ target, reason, sources: [...sources].sort() });
  }
  return problems;
}

let problems;
try {
  await crawl();
  problems = await validate();
} catch (error) {
  console.error(
    `Could not check links on ${base.origin}: ${error.cause?.message ?? error.message}`,
  );
  console.error('Start the production server first (see the usage note at the top of this file).');
  process.exit(1);
}

console.log(`Checked ${links.size} internal links on ${pages.size} URLs.`);
if (problems.length > 0) {
  for (const problem of problems) {
    console.error(`\nBroken link: ${problem.target} (${problem.reason})`);
    for (const source of problem.sources) console.error(`  found on ${source}`);
  }
  console.error(`\n${problems.length} broken link(s).`);
  process.exit(1);
}
console.log('No broken internal links.');
