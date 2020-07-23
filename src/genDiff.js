import _ from 'lodash';

const compareData = (firstData, secondData) => {
  const keys = _.union(Object.keys(firstData), Object.keys(secondData)).sort();
  const diff = keys.map((key) => {
    if (!_.has(firstData, key)) {
      return { name: key, value: secondData[key], status: 'added' };
    }
    if (!_.has(secondData, key)) {
      return { name: key, value: firstData[key], status: 'deleted' };
    }
    if (_.isObject(firstData[key]) && _.isObject(secondData[key])) {
      return {
        name: key,
        status: 'hasChildren',
        children: compareData(firstData[key], secondData[key]),
      };
    }
    if (firstData[key] !== secondData[key]) {
      return {
        name: key, valueBefore: firstData[key], valueAfter: secondData[key], status: 'changed',
      };
    }
    return { name: key, value: firstData[key], status: 'unchanged' };
  });
  return diff;
};

export default compareData;
