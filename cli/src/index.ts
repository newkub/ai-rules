#!/usr/bin/env bun

import { intro, outro, select, cancel, isCancel } from '@clack/prompts';
import { handleInstall } from './commands/install';
import { handleAdd } from './commands/add';

async function main() {
  console.clear();
  await intro('AI Rules CLI');
  
  // Get installation type
  const installType = await select({
    message: 'Choose installation type:',
    options: [
      { value: 'sync', label: 'Sync files', hint: 'Copy files to target locations' },
      { value: 'add', label: 'Add files', hint: 'Add new files to repository' },
    ],
    initialValue: 'sync',
  });
  
  if (isCancel(installType)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  if (installType === 'sync') {
    await handleInstall();
  } else {
    await handleAdd();
  }
  
  await outro('File transformation complete!');
}

// CLI entry point
if (import.meta.main) {
  main().catch(console.error);
}