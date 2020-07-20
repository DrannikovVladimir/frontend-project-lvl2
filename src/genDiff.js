import _ from 'lodash';

const compareData = (firstFile, secondFile) => {
  const keys = _.union(Object.keys(firstFile), Object.keys(secondFile)).sort();
  const diff = keys.map((key) => {
    if (!_.has(firstFile, key)) {
      return { name: key, value: secondFile[key], status: 'added' };
    }
    if (!_.has(secondFile, key)) {
      return { name: key, value: firstFile[key], status: 'deleted' };
    }
    if (_.isObject(firstFile[key]) && _.isObject(secondFile[key])) {
      return {
        name: key,
        status: 'hasChildren',
        children: compareData(firstFile[key], secondFile[key]),
      };
    }
    if (firstFile[key] !== secondFile[key]) {
      return {
        name: key, valueBefore: firstFile[key], valueAfter: secondFile[key], status: 'changed',
      };
    }
    return { name: key, value: firstFile[key], status: 'unchanged' };
  });
  return diff;
};

export default compareData;
