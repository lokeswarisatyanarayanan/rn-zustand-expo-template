#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const prompt = require('prompt-sync')({ sigint: true });

(async () => {
  const root = process.cwd();

  const answer = prompt(
    '❓ Do you want to move features/post to src/example instead of deleting it? (Y/n) ',
  )
    .trim()
    .toLowerCase();
  const moveInsteadOfDelete = answer === '' || answer === 'y';

  const from = path.join(root, 'features', 'post');
  const to = path.join(root, 'src', 'example');

  if (await fs.pathExists(from)) {
    if (moveInsteadOfDelete) {
      await fs.ensureDir(path.dirname(to));
      await fs.move(from, to, { overwrite: true });
      console.log('📦✨ Moved features/post → src/example');
    } else {
      await fs.remove(from);
      console.log('🗑️💨 Deleted features/post directory');
    }
  } else {
    console.log('ℹ️ Nothing to do: no features/post folder found');
  }

  const featuresDir = path.join(root, 'features');
  await fs.ensureDir(featuresDir);
  await fs.writeFile(path.join(featuresDir, '.gitkeep'), '');
  console.log('📁🌱 Left empty features/ folder with .gitkeep');

  if (moveInsteadOfDelete) {
    const wantsColor =
      prompt('🌈 Change primary color in src/library/design/theme/colors.ts? (y/N) ')
        .trim()
        .toLowerCase() === 'y';

    if (wantsColor) {
      const newColor = prompt('   → Enter hex color (e.g. #3b82f6): ').trim() || '#3b82f6';
      const colorsFile = path.join(root, 'src', 'library', 'design', 'theme', 'colors.ts');

      if (await fs.pathExists(colorsFile)) {
        let content = await fs.readFile(colorsFile, 'utf8');

        const primaryColorRegex = /(primary500:\s*")[#a-fA-F0-9]+(")/;

        if (primaryColorRegex.test(content)) {
          content = content.replace(primaryColorRegex, `$1${newColor}$2`);
          await fs.writeFile(colorsFile, content);
          console.log(`🌟 Updated primary500 color to ${newColor} in colors.ts`);
        } else {
          console.warn(`⚠️ Could not find primary500 color declaration in colors.ts`);
        }
      } else {
        console.warn(`⚠️ colors.ts file not found at ${colorsFile}`);
      }
    }

    const allFiles = glob.sync(path.join(root, '**/*.{ts,tsx,js,jsx}'), {
      ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/scripts/**'],
    });

    for (const file of allFiles) {
      let content = await fs.readFile(file, 'utf8');
      const updated = content.replace(/(['"])features\/post(['"])/g, '$1src/example$2');
      if (updated !== content) {
        await fs.writeFile(file, updated);
        console.log(`🔧 Updated imports in ${path.relative(root, file)}`);
      }
    }
  }

  const pkgPath = path.join(root, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJSON(pkgPath);
    delete pkg.keywords;
    delete pkg.license;
    if (pkg.scripts) {
      delete pkg.scripts['reset-project'];
    }
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 });
    console.log('🧼 Cleaned package.json (removed keywords, license, reset-project script)');
  }

  const scriptsDir = path.join(root, 'scripts');
  try {
    await fs.remove(scriptsDir);
    console.log('🔥 Removed /scripts folder (self-destruct)');
  } catch (err) {
    console.error('⚠️ Failed to remove /scripts folder:', err);
  }

  console.log('\n🎉 Reset complete! Run `npx expo start` and keep creating magic! ✨🚀');
})();
