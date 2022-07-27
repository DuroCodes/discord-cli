import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export const getPackageManager: () => PackageManager = () => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('yarn')) return 'yarn';
    if (userAgent.startsWith('pnpm')) return 'pnpm';
    return 'npm';
  }
  return 'npm';
};

export const validateProjectName = (input: string) => {
  const validationRegExp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

  const paths = input.split('/');

  const indexOfDelimiter = paths.findIndex((p) => p.startsWith('@'));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith('@')) !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  if (validationRegExp.test(appName ?? '')) {
    return true;
  }
  return 'App name must be lowercase, alphanumeric, and only use -, _, and @';
};

export const execa = promisify(exec);

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
};
