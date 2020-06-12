import createDiff from './createDiff.js';
import renderTree from './stylish.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const diff = createDiff(pathToFile1, pathToFile2);
  const tree = renderTree(diff);
  return tree;
};

export default genDiff;
