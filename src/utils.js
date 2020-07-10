import fs from 'fs';
import process from 'process';
import path from 'path';

const normalizePath = (pathToFile) => path.resolve(process.cwd(pathToFile), pathToFile);

const readFile = (pathToFile) => {
  const fullPath = normalizePath(pathToFile);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const getExtentionFile = (pathToFile) => {
  const fullPath = normalizePath(pathToFile);
  const extentionFile = path.extname(path.basename(fullPath)).slice(1);
  return extentionFile;
};

export { readFile, getExtentionFile };
