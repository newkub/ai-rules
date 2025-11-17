import { readdir, readFile, writeFile, stat, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

export async function processFiles(sourceDir: string, targetDir: string, frontmatterType: string, targetPlatform: string = 'qoder') {
  try {
    // Check if source directory exists
    try {
      await stat(sourceDir);
    } catch {
      console.error(`Error: Source directory '${sourceDir}' does not exist`);
      process.exit(1);
    }
    
    // Create target directory if it doesn't exist
    try {
      await stat(targetDir);
    } catch {
      console.log(`Creating target directory: ${targetDir}`);
      await mkdir(targetDir, { recursive: true });
    }
    
    const sourceFiles = await readdir(sourceDir);
    const targetFiles = await readdir(targetDir);
    
    // Filter only markdown files
    const sourceMdFiles = sourceFiles.filter(file => file.endsWith('.md'));
    const targetMdFiles = targetFiles.filter(file => file.endsWith('.md'));
    
    let processedCount = 0;
    
    // Process source files (add/update)
    for (const file of sourceMdFiles) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);
      
      // Read the source file content
      let content = await readFile(sourcePath, 'utf-8');
      
      // If no frontmatter is requested, just copy the file
      if (frontmatterType === 'none') {
        await writeFile(targetPath, content, 'utf-8');
        console.log(`Copied ${file}`);
        processedCount++;
        continue;
      }
      
      // Remove any existing frontmatter (lines between ---)
      const lines = content.split('\n');
      let filteredLines = [];
      let inFrontmatter = false;
      
      for (const line of lines) {
        if (line.trim() === '---') {
          inFrontmatter = !inFrontmatter;
          continue;
        }
        
        if (!inFrontmatter) {
          filteredLines.push(line);
        }
      }
      
      // Remove leading empty lines
      while (filteredLines.length > 0 && filteredLines[0].trim() === '') {
        filteredLines.shift();
      }
      
      // Add the new frontmatter based on type
      let frontmatterContent = '';
      if (frontmatterType === 'manual') {
        frontmatterContent = 'trigger: manual';
      } else if (frontmatterType === 'auto') {
        frontmatterContent = 'auto_execution_mode: 3';
      }
      
      // Add description for Windsurf platform
      if (targetPlatform === 'windsurf' || targetPlatform === 'all') {
        // Extract description from filename (remove .md extension and replace hyphens with spaces)
        const description = file.replace(/\.md$/, '').replace(/-/g, ' ');
        frontmatterContent = `description: ${description}\n${frontmatterContent}`;
      }
      
      const newContent = `---
${frontmatterContent}
---

${filteredLines.join('\n')}`;
      
      // Write the new file
      try {
        await writeFile(targetPath, newContent, 'utf-8');
        console.log(`Processed ${file}`);
        processedCount++;
      } catch (writeError) {
        console.error(`Error writing file ${file}:`, writeError);
      }
    }
    
    // Remove files that exist in target but not in source
    const filesToRemove = targetMdFiles.filter(file => !sourceMdFiles.includes(file));
    for (const file of filesToRemove) {
      const targetPath = join(targetDir, file);
      try {
        await unlink(targetPath);
        console.log(`Removed ${file}`);
      } catch (removeError) {
        console.error(`Error removing file ${file}:`, removeError);
      }
    }
    
    console.log(`\nSync completed! ${processedCount} files processed, ${filesToRemove.length} files removed.`);
  } catch (error) {
    console.error('Error processing files:', error);
    process.exit(1);
  }
}