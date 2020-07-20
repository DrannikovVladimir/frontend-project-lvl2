import compareData from './genDiff.js';
import render from './formatters/index.js';
import parse from './parser.js';
import { readFile, getExtentionFile } from './utils.js';

const genDiff = (pathToFile1, pathToFile2, format = 'nested') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const type = getExtentionFile(pathToFile1);
  const firstConfig = parse(type, data1);
  const secondConfig = parse(type, data2);
  const ast = compareData(firstConfig, secondConfig);
  return render(ast, format);
};

export default genDiff;
