import fs from 'fs';
import { exec, execSync } from 'child_process';

const LUCIDE_ROOT = '.';
const SVG_DOWNLOAD_PATH = './scripts/healthIcons/downloads-here';

function getSvgPaths() {
  return new Promise((resolve) => {
    exec(`find ${SVG_DOWNLOAD_PATH} '*.svg'`, (_, stdout) => {
      resolve(
        stdout.split('\n').reduce((acc, next) => {
          if (next.endsWith('.svg')) {
            acc.push(next.replace(new RegExp(`${SVG_DOWNLOAD_PATH}/`, 'g'), ''));
          }
          return acc;
        }, []),
      );
    });
  });
}

/**
 *
 * @param {string} fileName
 * @param {boolean} fill
 */
function formatIconName(fileName, fill) {
  const withoutFileExt = fileName.replace('.svg', '');
  const firstChar = (() => {
    switch (withoutFileExt[0]) {
      case '0':
        return 'zero';
      case '1':
        return 'one';
      case '2':
        return 'two';
      case '3':
        return 'three';
      case '4':
        return 'four';
      case '5':
        return 'five';
      case '6':
        return 'six';
      case '7':
        return 'seven';
      case '8':
        return 'eight';
      case '9':
        return 'nine';
      case '!':
        return 'exclamation';
      default:
        return withoutFileExt[0];
    }
  })();

  return `${firstChar}${withoutFileExt.substring(1)}${fill ? '_fill' : ''}`.toLowerCase();
}

/**
 *
 * @param {string[]} filePaths
 */
const structureSvgData = (filePaths) => {
  const icons = new Map();
  const categories = new Map();

  filePaths.forEach((file) => {
    const [type, category, icon] = file.split('/');
    const newIconName = formatIconName(icon, type === 'filled');

    if (!categories.has(category)) {
      categories.set(category, newIconName);
    }

    icons.set(file, {
      category,
      newIconName,
    });
  });

  return { icons, categories };
};

function moveAndRename(oldFilePath, newIconName) {
  return execSync(`cp ${SVG_DOWNLOAD_PATH}/${oldFilePath} ${LUCIDE_ROOT}/icons/${newIconName}.svg`);
}

function writeJsonMetadata(iconName, category) {
  return fs.writeFileSync(
    `${LUCIDE_ROOT}/icons/${iconName}.json`,
    JSON.stringify({
      $schema: '../icon.schema.json',
      contributors: ['hello-rory'],
      tags: ['medical', 'healthcare'],
      categories: [category],
    }),
  );
}

function writeCategoryMetadata(title, icon) {
  return fs.writeFileSync(
    `${LUCIDE_ROOT}/categories/${title}.json`,
    JSON.stringify({
      $schema: '../category.schema.json',
      title,
      icon,
    }),
  );
}

async function main() {
  const { categories, icons } = await getSvgPaths().then(structureSvgData);

  // 1. write categories for each subfolder
  Array.from(categories.entries()).forEach(([title, icon]) => {
    writeCategoryMetadata(title, icon);
  });

  console.log('Finished writing categories');

  Array.from(icons.entries()).forEach(([oldFilePath, { category, newIconName }]) => {
    writeJsonMetadata(newIconName, category);
    moveAndRename(oldFilePath, newIconName);
  });

  console.log('Formatting icons...');
  execSync(`pnpm prettier ./icons --write `, {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    parser: 'babel',
  });

  console.log('Formatting categories...');
  execSync(`pnpm prettier ./categories --write `, {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    parser: 'babel',
  });

  console.log(`Finished writing ${icons.size} icons`);
}

main();
