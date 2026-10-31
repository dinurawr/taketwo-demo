#!/usr/bin/env node
/**
 * Self-host the catalogue images.
 *
 * data/products.ts references real product photography on cdn.shopify.com via
 * the ts()/ab()/fb() helpers. Hotlinking works, but to make the images
 * un-break-able you can mirror them into /public and point the catalogue at
 * the local copies. Run once, locally (your own network):
 *
 *     node scripts/self-host-images.mjs
 *
 * It downloads every image into public/products/, rewrites data/products.ts to
 * use /products/<file> paths, and drops the now-unused helpers. Re-run safe:
 * already-downloaded files are skipped. Requires Node 18+ (global fetch).
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS_TS = join(ROOT, "data", "products.ts");
const OUT_DIR = join(ROOT, "public", "products");

const PREFIX = {
  ts: "https://cdn.shopify.com/s/files/1/0070/1922/files/",
  ab: "https://cdn.shopify.com/s/files/1/0150/1528/files/",
  fb: "https://cdn.shopify.com/s/files/1/0158/2548/files/",
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
  let src = await readFile(PRODUCTS_TS, "utf8");

  const calls = [...src.matchAll(/\b(ts|ab|fb)\("([^"]+)"\)/g)];
  const unique = new Map(); // token -> {url, file, local}
  for (const m of calls) {
    const token = m[0], helper = m[1], fn = m[2];
    if (unique.has(token)) continue;
    const file = safeName(fn);
    unique.set(token, { url: PREFIX[helper] + fn, file, local: "/products/" + file });
  }

  console.log(`Found ${unique.size} unique images. Downloading to ${OUT_DIR} ...`);
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
    console.error(`\n${failed} image(s) failed — products.ts NOT rewritten. Re-run to retry.`);
    process.exit(1);
  }

  // Rewrite tokens -> local paths, then drop the now-unused helper lines.
  for (const [token, info] of unique) src = src.split(token).join(`"${info.local}"`);
  src = src.replace(/^const (ts|ab|fb) = \(f: string\) =>[\s\S]*?;\n/gm, "");
  src = src.replace(/^\/\/ {3}ts → Taylor Stitch[\s\S]*?node scripts\/self-host-images\.mjs\n/m, "");
  await writeFile(PRODUCTS_TS, src);

  console.log(`\nDone: ${done} downloaded, ${skipped} already present.`);
  console.log("data/products.ts now points at /products/*. You can remove the");
  console.log('cdn.shopify.com entry from next.config.ts if you like, then commit public/products/.');
}

main().catch((e) => { console.error(e); process.exit(1); });
