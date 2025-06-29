#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const prompt = require('prompt-sync')({ sigint: true });

(async () => {
  const root = process.cwd();

  /* ──────────────────────────────────────────────────────────────── 1  */
  const answer = prompt('❓  Move features/post to src/example (and keep sample)? (Y/n) ')
    .trim()
    .toLowerCase();
  const keepSample = answer === '' || answer === 'y';

  const fromFeature = path.join(root, 'src', 'features', 'post');
  const toFeature = path.join(root, 'src', 'example');

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

  const featuresDir = path.join(root, 'src', 'features');
  await fs.ensureDir(featuresDir);
  await fs.writeFile(path.join(featuresDir, '.gitkeep'), '');
  console.log('📁🌱  Ensured empty src/features/ with .gitkeep');

  /* ──────────────────────────────────────────────────────────────── 2  */
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

  /* ──────────────────────────────────────────────────────────────── 3  */
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
        content = content.replace(/.*\/posts.*\n?/g, '');
      }
      if (content !== original) {
        await fs.writeFile(file, content);
        console.log(`🔧   Updated ${path.relative(root, file)}`);
      }
    }

    /* ▼ new: replace _layout.tsx with default when sample deleted */
    if (!keepSample) {
      const defaultLayout = `
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}
`.trimStart();
      await fs.writeFile(path.join(appDir, '_layout.tsx'), defaultLayout);
      console.log('🎨  Replaced app/_layout.tsx with default layout');
    }

    /* ▼ new: replace index.tsx with welcome screen */
    const pkg = await fs.readJSON(path.join(root, 'package.json'));
    const projectName = pkg.name?.split('/').pop() || path.basename(root);

    const indexScreen = `
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ${projectName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
`.trimStart();
    await fs.writeFile(path.join(appDir, 'index.tsx'), indexScreen);
    console.log('👋  Replaced app/index.tsx with Welcome screen');
  }

  /* ──────────────────────────────────────────────────────────────── 4  */
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

  /* ──────────────────────────────────────────────────────────────── 5  */
  const pkgPath = path.join(root, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkgJson = await fs.readJSON(pkgPath);
    delete pkgJson.keywords;
    delete pkgJson.license;
    if (pkgJson.scripts) delete pkgJson.scripts['reset-project'];
    await fs.writeJSON(pkgPath, pkgJson, { spaces: 2 });
    console.log('🧼  Cleaned package.json (keywords, license, reset-project removed)');
  }

  const scriptsDir = path.join(root, 'scripts');
  try {
    await fs.remove(scriptsDir);
    console.log('🔥  Removed /scripts folder (self‑destruct)');
  } catch (err) {
    console.error('⚠️  Failed to remove /scripts folder:', err);
  }

  console.log(
    '\n🎉  Reset complete! Run `npx expo prebuild and npx run ios/android` and keep creating magic! ✨🚀',
  );
})();
