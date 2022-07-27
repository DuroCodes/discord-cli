import { PackageManager } from '../util';

export type Handler = 'NikansWorld' | 'reconlx';

export interface CliFlags {
  installPackages: boolean;
  packageManager: PackageManager;
  initGit: boolean;
}

export interface CliOptions {
  projectName: string;
  handler: Handler;
  flags: CliFlags
}
