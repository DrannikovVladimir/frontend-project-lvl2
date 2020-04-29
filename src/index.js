import _ from 'lodash';
import fs from 'fs';
import process from 'process';
import path from 'path';

const genDiff = (pathToFile1, pathToFile2) => {
  const firstFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(pathToFile1),
    pathToFile1)));
  const secondFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(pathToFile2),
    pathToFile2)));
  const firstFileKeys = Object.keys(firstFile);
  const secondFileKeys = Object.keys(secondFile);
  const allKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
  const result = allKeys.reduce((acc, item) => {
    const valueFirst = _.get(firstFile, item);
    const valueSecond = _.get(secondFile, item);
    if (_.has(firstFile, item) && _.has(secondFile, item)) {
      return (valueFirst === valueSecond)
        ? [...acc, [`   ${item}: ${valueFirst}`]]
        : [...acc, [` + ${item}: ${valueSecond}`], [` - ${item}: ${valueFirst}`]];
    }
    return (_.has(firstFile, item) && !_.has(secondFile, item))
      ? [...acc, [` - ${item}: ${valueFirst}`]] : [...acc, [` + ${item}: ${valueSecond}`]];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
