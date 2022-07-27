import { createProject } from './helpers';
import { logger } from './util';
import { run } from './cli';

const main = async () => {
  const { version } = process;
  const [major, minor] = version.split('.');
  const majorNum = parseInt((major as string).slice(1));
  const minorNum = parseInt(minor as string);

  if (majorNum < 16 || (majorNum === 16 && minorNum < 10)) {
    logger.error(`\nYou are using Node ${version}!\nPlease upgrade to Node 16.10.x or higher!\n`);
    process.exit(1);
  }

  const { flags, handler, projectName } = await run();

  console.clear();
  await createProject({
    flags,
    handler,
    projectName,
  });
};

(async () => {
  await main();
})();
