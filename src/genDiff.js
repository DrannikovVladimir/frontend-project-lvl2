import _ from 'lodash';

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

export default genAst;
