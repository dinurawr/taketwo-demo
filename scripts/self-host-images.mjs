#!/usr/bin/env node
/**
 * Self-host every catalogue / demo image.
 *
 * The catalogue (data/products.ts) and the home tiles, order history and
 * vendor fixtures reference real product photography on public Shopify CDNs
 * via the ts()/ab()/fb()/fr() helpers. Hotlinking works, but to make the
 * images un-break-able you can mirror them into /public and point everything
 * at the local copies. Run once, locally (your own network):
 *
 *     node scripts/self-host-images.mjs
 *
 * It downloads every referenced image into public/products/, rewrites each
 * source file to use /products/<file> paths, and drops the now-unused helpers.
 * Re-run safe: already-downloaded files are skipped. Requires Node 18+.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "products");

// Source files that reference images via the ts/ab/fb/fr helpers.
const FILES = [
  "data/products.ts",
  "data/orders.ts",
  "data/seller-fixtures.ts",
  "data/brands.ts",
  "app/customer/(app)/home/page.tsx",
];

const PREFIX = {
  ts: "https://cdn.shopify.com/s/files/1/0070/1922/files/", // Taylor Stitch
  ab: "https://cdn.shopify.com/s/files/1/0150/1528/files/", // Anine Bing
  fb: "https://cdn.shopify.com/s/files/1/0158/2548/files/", // Frankies Bikinis
  fr: "https://cdn.shopify.com/s/files/1/0077/6673/6963/files/", // FARM Rio
};

const exists = (p) => access(p).then(() => true).catch(() => false);
const safeName = (fn) => fn.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/-+/g, "-");

async function download(url, dest, tries = 4) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error("suspiciously small (" + buf.length + "b)");
      await writeFile(dest, buf);
      return buf.length;
    } catch (e) {
      if (i === tries) throw e;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // 1. Collect every unique image across all source files.
  const sources = new Map(); // relPath -> text
  const unique = new Map();  // token -> {helper, fn, url, file, local}
  for (const rel of FILES) {
    const text = await readFile(join(ROOT, rel), "utf8");
    sources.set(rel, text);
    for (const m of text.matchAll(/\b(ts|ab|fb|fr)\("([^"]+)"\)/g)) {
      const token = m[0], helper = m[1], fn = m[2];
      if (unique.has(token)) continue;
      const file = safeName(fn);
      unique.set(token, { helper, fn, url: PREFIX[helper] + fn, file, local: "/products/" + file });
    }
  }

  console.log(`Found ${unique.size} unique images across ${FILES.length} files. Downloading to ${OUT_DIR} ...`);
  let done = 0, skipped = 0, failed = 0;
  for (const { url, file } of unique.values()) {
    const dest = join(OUT_DIR, file);
    if (await exists(dest)) { skipped++; continue; }
    try {
      const bytes = await download(url, dest);
      done++;
      console.log(`  ✓ ${file} (${Math.round(bytes / 1024)}kb)`);
    } catch (e) {
      failed++;
      console.error(`  ✗ ${file} — ${e.message}\n      ${url}`);
    }
  }

  if (failed) {
    console.error(`\n${failed} image(s) failed — no files rewritten. Re-run to retry.`);
    process.exit(1);
  }

  // 2. Rewrite each file: tokens -> local paths, then drop unused helper lines.
  for (const [rel, textOrig] of sources) {
    let text = textOrig;
    for (const [token, info] of unique) text = text.split(token).join(`"${info.local}"`);
    // Remove the ts/ab/fb/fr helper const definitions (now unused).
    text = text.replace(/^const (ts|ab|fb|fr) = \(f: string\) =>[^\n]*\n/gm, "");
    if (text !== textOrig) await writeFile(join(ROOT, rel), text);
  }

  console.log(`\nDone: ${done} downloaded, ${skipped} already present.`);
  console.log("All source files now point at /products/*. You can remove the");
  console.log('cdn.shopify.com entry from next.config.ts if you like, then commit public/products/.');
}

main().catch((e) => { console.error(e); process.exit(1); });
