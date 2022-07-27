import path from 'path';
import fs from 'fs';
import { CliOptions } from '../types';
import { scaffoldProject } from './scaffoldProject';
import { logger } from '../util';

export const createProject = async ({
  projectName,
  handler,
  flags,
}: CliOptions) => {
  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(`${projectDir} exists but is empty, continuing...\n`);

      await scaffoldProject({
        projectName, projectDir, flags, handler,
      });
    } else {
      logger.error(`${projectDir} exists and is not empty, stopping...\n`);
      process.exit(1);
    }
  }

  await scaffoldProject({
    projectName, projectDir, flags, handler,
  });
};
