#!/usr/bin/env node

import { Command, Runner } from './types';
import { checkConfig, getArguments, getConfig } from './config';
import { addIcon } from './commands/add';

const runners: Record<Command, Runner> = {
  [Command.ADD]: addIcon,
};

const run = async () => {
  const [,, cmd, ...argz] = process.argv;
  const command = cmd as Command;
  const [args, flags] = getArguments(argz);

  if (!Object.values(Command).includes(command)) {
    console.error(`"${command}" is not a known command`);
    return process.exit(1);
  }

  const config = await getConfig();
  await checkConfig(config);

  runners[command](config, args, flags);
};

run();

