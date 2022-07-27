import ora from 'ora';
import { CliFlags, Handler } from '../types';
import { execa, logger } from '../util';
import { installPackages } from './installPackages';

export type HandlerMap = {
  [key in Handler]: string;
}

export const handlerMap: HandlerMap = {
  NikansWorld: 'https://github.com/NikansWorld/discordjs-typescript-handler',
  reconlx: 'https://github.com/reconlx/djs-typescript-handler',
};

export interface ScaffoldProjectOptions {
  handler: Handler;
  projectName: string;
  projectDir: string;
  flags: CliFlags;
}

export const scaffoldProject = async (opts: ScaffoldProjectOptions) => {
  const {
    handler, projectName, projectDir, flags,
  } = opts;

  const handlerGit = handlerMap[handler];
  const spinner = ora(`Creating project in ${projectName}`).start();

  try {
    await execa(`git clone ${handlerGit} ${projectName}`);
  } catch {
    spinner.stop();
    logger.error('Git could not clone successfully! Please install git!');
    process.exit(1);
  }

  if (flags.initGit) {
    spinner.text = 'Initializing repository...';
    await execa('git init', { cwd: projectDir });
  }

  if (flags.installPackages) {
    spinner.text = 'Installing packages...';
    await installPackages({
      installPackages: flags.installPackages,
      packageManager: flags.packageManager,
      projectDir,
    });
  }

  spinner.stop();
};
