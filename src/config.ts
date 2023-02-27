import { readFile, access, mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Config, Flag, Flags } from './types';

const rcFileName = './.iconitorc';
const packageFileName = './package.json';

const readConfig = async (fileName: string, key?: string) => {
  try {
    const fileContent = await readFile(fileName, 'utf8');
    const config = JSON.parse(fileContent);
    return key ? (config[key] as Config) : config as Config;
  } catch (err) {
    throw new Error('Invalid configuration');
  }
};

const createDefinitions = async (path: string) => {
  const dir = dirname(path);

  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true })
  }

  return copyFile(join(module.path, '../empty-defs.svg'), path);
};

const parseFlags = (flagsStrs: string[]): Flags => {
  const flags: Flags = {
    [Flag.KEEP_COLORS]: false,
  };

  flagsStrs.forEach(flagStr => {
    const [flagName, valStr] = flagStr.replace(/^\-\-/, '').split('=') as [Flag, string];
    if (!Object.values(Flag).includes(flagName)) return;

    flags[flagName] = valStr !== 'false';
  });

  return flags;
};

export const getConfig = async () => {
  const rcConfig = await readConfig(rcFileName, '');
  if (rcConfig) return rcConfig;

  const packageConfig = await readConfig(packageFileName, 'iconito');
  if (packageConfig) return packageConfig;

  throw new Error('Cannot find iconito configuration');
};

export const getArguments = (argz: string[]): [string[], Flags] => {
  const args: string[] = [];
  const flagsStr: string[] = [];

  for (const input of argz) {
    const arr = input.startsWith('--') ? flagsStr : args;
    arr.push(input);
  }

  const flags = parseFlags(flagsStr);

  return [args, flags];
};

export const checkConfig = async (config: Config) => {
  if (!config.definitions) {
    throw new Error('No definitions path');
  }

  try {
    await access(config.definitions);
  } catch (err) {
    return createDefinitions(config.definitions)
  }
};
