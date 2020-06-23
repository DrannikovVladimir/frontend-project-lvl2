import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import parseFile from './parser.js';

const genAst = (firstFile, secondFile) => {
  const keys = _.union(Object.keys(firstFile), Object.keys(secondFile)).sort();
  const treeAst = keys.map((key) => {
    if (_.isObject(firstFile[key]) && _.isObject(secondFile[key])) {
      return {
        name: key,
        status: 'hasChildren',
        children: genAst(firstFile[key], secondFile[key]),
      };
    }
    if (!_.has(firstFile, key)) {
      return { name: key, value: secondFile[key], status: 'added' };
    }
    if (!_.has(secondFile, key)) {
      return { name: key, value: firstFile[key], status: 'deleted' };
    }
    if (firstFile[key] !== secondFile[key]) {
      return {
        name: key, valueBefore: firstFile[key], valueAfter: secondFile[key], status: 'changed',
      };
    }
    return { name: key, value: firstFile[key], status: 'unchanged' };
  });
  return treeAst;
};

const normalizePath = (pathToFile) => path.resolve(process.cwd(pathToFile), pathToFile);
const readFile = (pathToFile) => fs.readFileSync(pathToFile).toString();
const getExtentionFile = (pathToFile) => path.extname(path.basename(pathToFile)).slice(1);

const createDiff = (pathToFile1, pathToFile2) => {
  const pathToFirstFile = normalizePath(pathToFile1);
  const pathToSecondFile = normalizePath(pathToFile2);
  const type = getExtentionFile(pathToFile1);
  const dataFirstFile = readFile(pathToFirstFile);
  const dataSecondFile = readFile(pathToSecondFile);
  const firstFile = parseFile(type, dataFirstFile);
  const secondFile = parseFile(type, dataSecondFile);
  const diff = genAst(firstFile, secondFile);
  return diff;
};

export default createDiff;
