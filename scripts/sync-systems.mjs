/**
 * Sync systems metadata + manifest from the neostation-frontend repo.
 *
 * Downloads every system JSON under assets/systems and the assets/manifest.json
 * into public/systems so the site can read them locally at build time.
 *
 * Usage:
 *   node scripts/sync-systems.mjs
 *
 * Optional env:
 *   NEOSTATION_REPO    e.g. "misobadev/neostation-frontend" (default)
 *   NEOSTATION_BRANCH  e.g. "main" (default)
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = process.env.NEOSTATION_REPO ?? "misobadev/neostation-frontend";
const BRANCH = process.env.NEOSTATION_BRANCH ?? "main";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEST_DIR = path.join(ROOT, "public", "systems");

// Files that exist in the repo but are not real systems (no folder structure).
const IGNORE = new Set(["all.json", "favorites.json", "android.json", "manifest.json"]);

const API = `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`;
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/`;

async function main() {
  console.log(`Fetching tree from ${API}...`);
  const res = await fetch(API, {
    headers: { "User-Agent": "neostation-web-sync" },
  });
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

  const tree = await res.json();
  if (tree.truncated) {
    console.warn("Warning: git tree was truncated; some systems may be missing.");
  }

  const systemFiles = tree.tree
    .filter((e) => e.type === "blob" && e.path.startsWith("assets/systems/") && e.path.endsWith(".json"))
    .map((e) => e.path.split("/").pop())
    .filter((name) => !IGNORE.has(name));

  const manifestFile = "assets/manifest.json";

  console.log(`Found ${systemFiles.length} systems + manifest.json`);

  // Fetch all system files in parallel.
  const entries = await Promise.all(
    systemFiles.map(async (name) => {
      const url = `${RAW}assets/systems/${name}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(`Failed to fetch ${url}: ${r.status}`);
      return [name, await r.text()];
    }),
  );

  // Fetch the manifest too.
  const manifestUrl = `${RAW}${manifestFile}`;
  const mr = await fetch(manifestUrl);
  if (!mr.ok) throw new Error(`Failed to fetch manifest: ${mr.status}`);
  const manifestText = await mr.text();

  // Write files.
  await Promise.all(
    entries.map(async ([name, content]) => {
      const filePath = path.join(DEST_DIR, name);
      await writeFile(filePath, content);
      console.log(`  wrote ${name}`);
    }),
  );

  await writeFile(path.join(DEST_DIR, "manifest.json"), manifestText);
  console.log("  wrote manifest.json");

  const manifest = JSON.parse(manifestText);
  console.log(`Done. Latest version: ${manifest.latest_version ?? "unknown"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});