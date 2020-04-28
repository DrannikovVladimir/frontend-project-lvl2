import _ from 'lodash';
import program from 'commander';
import fs from 'fs';
import process from 'process';
import path from 'path';

const genDiff = (pathToFile1, pathToFile2) => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .action((a = pathToFile1, b = pathToFile2) => {
      const firstFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(a), a)));
      const secondFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(b), b)));
      const firstFileKeys = Object.keys(firstFile);
      const secondFileKeys = Object.keys(secondFile);
      const allKeys = _.uniq([...firstFileKeys, ...secondFileKeys]);
      const result = allKeys.reduce((acc, item) => {
        const valueFirst = _.get(firstFile, item);
        const valueSecond = _.get(secondFile, item);
        if (_.has(firstFile, item) && _.has(secondFile, item)) {
          if (valueFirst === valueSecond) {
            return [...acc, [`   ${item} ${valueFirst}`]];
          }
          return [...acc, [` + ${item} ${valueSecond}`], [` - ${item} ${valueFirst}`]];
        }
        if (_.has(firstFile, item) && !_.has(secondFile, item)) {
          return [...acc, [` - ${item} ${valueFirst}`]];
        }
        if (!_.has(firstFile, item) && _.has(secondFile, item)) {
          return [...acc, [` + ${item} ${valueSecond}`]];
        }
        return result;
      }, []);
      console.log(`{\n${result.join('\n')}\n}`);
    });

  program.parse(process.argv);
};

export default genDiff;
