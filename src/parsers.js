import yaml from 'js-yaml';
import fs from 'fs';
import process from 'process';
import path from 'path';

const getParsedFiles = (pathToFile1, pathToFile2) => {
  const file1 = path.resolve(process.cwd(pathToFile1), pathToFile1);
  const file2 = path.resolve(process.cwd(pathToFile2), pathToFile2);
  const extentionFile = path.extname(path.basename(pathToFile1));
  let firstFile;
  let secondFile;
  if (extentionFile === '.json') {
    firstFile = JSON.parse(fs.readFileSync(file1));
    secondFile = JSON.parse(fs.readFileSync(file2));
  } else if (extentionFile === '.yml' || extentionFile === '.yaml') {
    firstFile = yaml.safeLoad(fs.readFileSync(file1), 'utf-8');
    secondFile = yaml.safeLoad(fs.readFileSync(file2), 'utf-8');
  }

  return [firstFile, secondFile];
};

export default getParsedFiles;
