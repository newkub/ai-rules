import { select, confirm, cancel, isCancel, text } from '@clack/prompts';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function handleAdd() {
  const targetDir = '../original';
  
  // Get input for files to place
  const filesToPlace = await text({
    message: 'Enter the files to place (comma-separated):',
    placeholder: 'file1.md,file2.md',
  });
  
  if (isCancel(filesToPlace)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  console.log(`Placing files: ${filesToPlace} in '${targetDir}' directory...`);
  
  // Ask if user wants to commit to GitHub repository
  const shouldCommit = await confirm({
    message: 'Do you want to commit the changes to the GitHub repository?',
  });
  
  if (isCancel(shouldCommit)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  if (shouldCommit) {
    try {
      // Git operations
      await execPromise('git add .');
      await execPromise('git commit -m "chore: update files from CLI"');
      await execPromise('git push origin main');
      console.log('Successfully committed and pushed to GitHub repository!');
    } catch (error) {
      console.error('Error committing to GitHub:', error);
      console.log('Please commit manually using git commands.');
    }
  } else {
    console.log('Files updated locally. You can commit manually later.');
  }
}