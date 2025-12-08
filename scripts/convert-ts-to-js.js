
import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../');
const srcDir = path.join(projectRoot, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(srcDir);

files.forEach(filePath => {
  const ext = path.extname(filePath);
  if (ext === '.ts' || ext === '.tsx') {
    console.log(`Converting: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Transpile using TypeScript API
    const result = ts.transpileModule(fileContent, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.Preserve, // Keep JSX as is
        removeComments: false,
      }
    });

    let newContent = result.outputText;
    
    // Simple heuristic to remove type-only imports if they persist (though transpileModule usually handles this)
    // newContent = newContent.replace(/import type .*? from .*?;/g, '');

    const newFilePath = filePath.replace(/\.ts$/, '.js').replace(/\.tsx$/, '.jsx');
    
    fs.writeFileSync(newFilePath, newContent);
    fs.unlinkSync(filePath); // Delete original file
    console.log(`Created: ${newFilePath}`);
  }
});

console.log('Conversion complete for src directory.');
