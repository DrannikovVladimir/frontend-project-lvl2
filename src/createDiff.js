import _ from 'lodash';
import getParsedFiles from './parsers.js';

const genAst = (firstFile, secondFile) => {
  const keys = _.union(Object.keys(firstFile), Object.keys(secondFile)).sort();
  const AST = keys.map((key) => {
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
        name: key, valueBefore: firstFile[key], valueAfter: secondFile[key], status: 'edited',
      };
    }
    return { name: key, value: firstFile[key], status: 'unchanged' };
  });
  return AST;
};

const createDiff = (pathToFile1, pathToFile2) => {
  const [firstFile, secondFile] = getParsedFiles(pathToFile1, pathToFile2);
  const diff = genAst(firstFile, secondFile);
  return diff;
};

export default createDiff;
