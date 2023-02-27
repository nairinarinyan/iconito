export enum Command {
  ADD = 'add',
}

export enum Flag {
  KEEP_COLORS = 'keepColors',
}

export type Flags = {
  [Flag.KEEP_COLORS]: boolean,
}

export type Config = {
  definitions: string;
};

export type Runner = (config: Config, args: string[], flags: Flags) => void;
