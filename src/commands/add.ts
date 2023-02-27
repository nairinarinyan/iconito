import { optimize, Config as SVGConfig } from 'svgo';
import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'path';
import { Config, Flags, Runner } from '../types';

const getSvgOptions = (keepColors: boolean): SVGConfig => ({
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: {
            currentColor: !keepColors
          }
        }
      }
    }
  ]
});

export const addIcon: Runner = async (config: Config, args: string[], flags: Flags) => {
  const [iconPath, iconName] = args;
  const iconDefinitions = await readFile(config.definitions, 'utf8');

  try {
    const iconStr = await readFile(iconPath, 'utf8');
    const svg = optimize(iconStr, getSvgOptions(flags.keepColors)).data;

    const viewBox = svg.match(/viewBox\=['"].*?['"]/)?.[0];
    const name = iconName || basename(iconPath).replace(/\.\w+$/, '');
    const attributes = ` ${viewBox} id="${name}"`;
    const closingTag = '</svg>';

    const symbol = svg
      .replace(/(?<=\<\/?)svg/g, 'symbol')
      .replace(/(?<=\<symbol).*?\>/, attributes + '>')

    const content = iconDefinitions.replace(closingTag, symbol + '\n' + closingTag);
    return writeFile(config.definitions, content);
  } catch (err) {
    console.error('Invalid icon path', err);
    return process.exit(1);
  }
};

