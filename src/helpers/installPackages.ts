import { execa, logger, PackageManager } from '../util';

export interface InstallPackagesOptions {
  packageManager: PackageManager;
  projectDir: string;
  installPackages: boolean;
}

export const installPackages = async (
  opts: InstallPackagesOptions,
) => {
  const { packageManager, installPackages, projectDir } = opts;
  if (installPackages) return execa(`${packageManager} install`, { cwd: projectDir });
  return logger.info('Skipped install packages!');
};
