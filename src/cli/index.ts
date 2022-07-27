import inquirer from 'inquirer';
import { CliOptions, Handler } from '../types';
import { logger, validateProjectName, getPackageManager } from '../util';

const defaultOptions: CliOptions = {
  projectName: 'my-discord-bot',
  handler: 'NikansWorld',
  flags: {
    installPackages: false,
    packageManager: 'npm',
    initGit: true,
  },
};

export const run = async () => {
  const cliResults = defaultOptions;

  cliResults.flags.packageManager = getPackageManager();

  try {
    const { projectName } = await inquirer.prompt<{ projectName: string }>({
      name: 'projectName',
      type: 'input',
      default: defaultOptions.projectName,
      validate: validateProjectName,
      transformer: (input: string) => input.trim(),
    });
    cliResults.projectName = projectName;

    const { language } = await inquirer.prompt<{ language: string }>({
      name: 'language',
      type: 'list',
      message: 'Will you be using JavaScript or TypeScript?',
      choices: [
        { name: 'TypeScript', value: 'typescript', short: 'TypeScript' },
        { name: 'JavaScript', value: 'javascript', short: 'TypeScript' },
      ],
      default: 'typescript',
    });

    if (language === 'javascript') {
      logger.error('Wrong answer, using TypeScript instead...');
    } else {
      logger.success('Good choice! Using TypeScript!');
    }

    const { handler } = await inquirer.prompt<{ handler: Handler }>({
      name: 'handler',
      type: 'list',
      message: 'Which handler will you be using?',
      choices: [
        'NikansWorld',
        'reconlx',
      ],
      default: 'NikansWorld',
    });
    cliResults.handler = handler;

    const { initGit } = await inquirer.prompt<{ initGit: boolean }>({
      name: 'initGit',
      type: 'confirm',
      message: 'Should we initialize a new git repository?',
      default: true,
    });

    if (initGit) {
      logger.success('Initializing a new repository!');
    } else {
      cliResults.flags.initGit = false;
      logger.info('You can always run \'git init\' at a later time!');
    }

    const { installPackages } = await inquirer.prompt<{ installPackages: boolean }>({
      name: 'installPackages',
      type: 'confirm',
      message: `Should we run ${cliResults.flags.packageManager} install?`,
      default: true,
    });

    if (installPackages) {
      logger.success('Installing the packages for you!');
    } else {
      cliResults.flags.installPackages = false;
      logger.info(`No worries! You can run '${cliResults.flags.packageManager} install' later.`);
    }
  } catch (err) {
    if (err instanceof Error && (err as any).isTTYError) {
      logger.warn('We need an interactive terminal to provide options.');
      logger.info('Creating a default app!');
    } else {
      throw err;
    }
  }

  return cliResults;
};
