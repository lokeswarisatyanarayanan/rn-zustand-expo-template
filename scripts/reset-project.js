#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const prompt = require('prompt-sync')({ sigint: true });

(async () => {
  const root = process.cwd();

  /** ------------------------------------------------------------------ *
   * 1. Ask whether to KEEP the sample feature (move → example) or DELETE
   * ------------------------------------------------------------------ */
  const answer = prompt('❓  Move features/post to src/example (and keep sample)? (Y/n) ')
    .trim()
    .toLowerCase();
  const keepSample = answer === '' || answer === 'y';

  const fromFeature = path.join(root, 'src', 'features', 'post');
  const toFeature = path.join(root, 'src', 'example');

  /* ------------------------------------------------------------------ *
   * 2. Handle feature folder
   * ------------------------------------------------------------------ */
  if (await fs.pathExists(fromFeature)) {
    if (keepSample) {
      await fs.ensureDir(path.dirname(toFeature));
      await fs.move(fromFeature, toFeature, { overwrite: true });
      console.log('📦✨  Moved  src/features/post  →  src/example');
    } else {
      await fs.remove(fromFeature);
      console.log('🗑️💨  Deleted src/features/post');
    }
  }

  /** Ensure empty features/ folder lives on for future slices */
  const featuresDir = path.join(root, 'src', 'features');
  await fs.ensureDir(featuresDir);
  await fs.writeFile(path.join(featuresDir, '.gitkeep'), '');
  console.log('📁🌱  Ensured empty src/features/ with .gitkeep');

  /* ------------------------------------------------------------------ *
   * 3. Handle matching route folders under /app
   * ------------------------------------------------------------------ */
  const appDir = path.join(root, 'app');
  const postsRoute = path.join(appDir, 'posts');
  const exampleRoute = path.join(appDir, 'example');

  if (await fs.pathExists(postsRoute)) {
    if (keepSample) {
      await fs.move(postsRoute, exampleRoute, { overwrite: true });
      console.log('🚚   Renamed  app/posts  →  app/example');
    } else {
      await fs.remove(postsRoute);
      console.log('🗑️💨  Deleted app/posts route folder');
    }
  }

  /* ------------------------------------------------------------------ *
   * 4. Patch route‑entry files if we renamed routes
   * ------------------------------------------------------------------ */
  if (await fs.pathExists(appDir)) {
    const routeEntries = ['index.tsx', '_layout.tsx']
      .map(f => path.join(appDir, f))
      .filter(fs.existsSync);

    for (const file of routeEntries) {
      let content = await fs.readFile(file, 'utf8');
      const original = content;
      if (keepSample) {
        content = content.replace(/(['"`])\/posts(['"`])/g, '$1/example$2');
      } else {
        // remove any link or import that mentions /posts
        content = content.replace(/.*\/posts.*\n?/g, '');
      }
      if (content !== original) {
        await fs.writeFile(file, content);
        console.log(`🔧   Updated ${path.relative(root, file)}`);
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * 5. Optional: update primary color when sample was kept
   * ------------------------------------------------------------------ */
  if (keepSample) {
    const wantsColor = prompt('🌈  Change primary color? (y/N) ').trim().toLowerCase() === 'y';

    if (wantsColor) {
      const newColor = prompt('   → Enter hex color (e.g. #3b82f6): ').trim() || '#3b82f6';
      const colorsFile = path.join(root, 'src', 'library', 'design', 'theme', 'colors.ts');

      if (await fs.pathExists(colorsFile)) {
        const txt = await fs.readFile(colorsFile, 'utf8');
        const updated = txt.replace(/(primary500:\s*")[#a-fA-F0-9]+(")/, `$1${newColor}$2`);
        await fs.writeFile(colorsFile, updated);
        console.log(`🌟  Updated primary500 color to ${newColor}`);
      } else {
        console.warn(`⚠️  colors.ts not found at ${colorsFile}`);
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * 6. Clean package.json + self‑destruct scripts folder
   * ------------------------------------------------------------------ */
  const pkgPath = path.join(root, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJSON(pkgPath);
    delete pkg.keywords;
    delete pkg.license;
    if (pkg.scripts) delete pkg.scripts['reset-project'];
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
    console.log('🧼  Cleaned package.json (keywords, license, reset-project removed)');
  }

  const scriptsDir = path.join(root, 'scripts');
  try {
    await fs.remove(scriptsDir);
    console.log('🔥  Removed /scripts folder (self‑destruct)');
  } catch (err) {
    console.error('⚠️  Failed to remove /scripts folder:', err);
  }

  console.log('\n🎉  Reset complete! Run `npx expo start` and keep creating magic! ✨🚀');
})();
