import createDiff from './createDiff.js';
import render from './formatters/index.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const diff = createDiff(pathToFile1, pathToFile2);
  const tree = render(diff, format);
  return tree;
};

export default genDiff;
