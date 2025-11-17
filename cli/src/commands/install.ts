import { select, confirm, cancel, isCancel } from '@clack/prompts';
import { processFiles } from '../utils';

export async function handleInstall() {
  const sourceDir = '../original';
  
  const platform = await select({
    message: 'Which platform are you targeting?',
    options: [
      { value: 'all', label: 'All platforms' },
      { value: 'windsurf', label: 'Windsurf' },
      { value: 'qoder', label: 'Qoder' },
    ],
    initialValue: 'all',
  });
  
  if (isCancel(platform)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  // Set target directories based on platform
  const targetDirs = [];
  if (platform === 'windsurf' || platform === 'all') {
    targetDirs.push('C:\\Users\\Veerapong\\.codeium\\windsurf\\global_workflows');
  }
  if (platform === 'qoder' || platform === 'all') {
    targetDirs.push('./.qoder/rules');
  }
  
  // Set frontmatter type based on platform automatically
  let frontmatterType = 'none'; // default to no frontmatter
  if (platform === 'qoder' || platform === 'all') {
    frontmatterType = 'manual'; // Qoder uses manual trigger
  } else if (platform === 'windsurf') {
    frontmatterType = 'auto'; // Windsurf uses auto execution
  }
  
  // Confirm before processing
  let targetDirDisplay = '';
  if (platform === 'all') {
    targetDirDisplay = `all platforms:\n  - Windsurf: C:\\Users\\Veerapong\\.codeium\\windsurf\\global_workflows (Windows path)\n  - Qoder: ./.qoder/rules (Unix-style path)`;
  } else {
    targetDirDisplay = platform === 'windsurf' ? 
      `Windsurf directory: C:\\Users\\Veerapong\\.codeium\\windsurf\\global_workflows (Windows path)` : 
      `Qoder directory: ./.qoder/rules (Unix-style path)`;
  }
    
  const shouldProceed = await confirm({
    message: `Transform files from '${sourceDir}' to ${targetDirDisplay} with ${frontmatterType} frontmatter?`,
  });
  
  if (isCancel(shouldProceed) || !shouldProceed) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  // Process files for each target directory
  for (const targetDir of targetDirs) {
    // Determine target platform for this directory
    let targetPlatform = 'qoder';
    if (targetDir.includes('windsurf')) {
      targetPlatform = 'windsurf';
    } else if (platform === 'all') {
      targetPlatform = 'all';
    }
    
    await processFiles(sourceDir, targetDir, frontmatterType as string, targetPlatform);
  }
}