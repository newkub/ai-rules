import { select, confirm, cancel, isCancel, text } from '@clack/prompts';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const execPromise = promisify(exec);

export async function handleAdd() {
  const targetDir = '../original';
  
  // Get input for files to place
  const filesToPlace = await text({
    message: 'Enter the files to place (comma-separated, filenames only):',
    placeholder: 'file1.md,file2.md',
  });
  
  if (isCancel(filesToPlace)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
  
  // Split the files and place them
  const fileArray = filesToPlace.split(',').map(file => file.trim());
  
  try {
    for (const fileInput of fileArray) {
      // Extract just the filename if a full path is provided
      const fileName = fileInput.includes('\\') || fileInput.includes('/') ? 
        fileInput.split(/\\|\//).pop() || fileInput : 
        fileInput;
      
      const filePath = join(targetDir, fileName);
      // Create a simple placeholder content for the file
      const content = `# ${fileName.replace('.md', '')}

This is a new file added via the CLI.`;
      await writeFile(filePath, content, 'utf-8');
      console.log(`Created file: ${filePath}`);
    }
  } catch (error) {
    console.error('Error placing files:', error);
    process.exit(1);
  }
  
  console.log(`Successfully placed ${fileArray.length} files in '${targetDir}' directory.`);
  
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