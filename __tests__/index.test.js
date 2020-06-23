import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();
const getExpectedResult = (format) => readFile(`result_${format}.txt`);
const formats = ['nested', 'plain', 'json'];
const extentions = ['json', 'yml', 'ini'];

formats.forEach((format) => {
  test.each(extentions)(
    `genDiff extension: %s, format: ${format}`,
    (extention) => {
      const pathToFileFirst = getFixturePath(`first.${extention}`);
      const pathToFileSecond = getFixturePath(`second.${extention}`);
      const currentResult = genDiff(pathToFileFirst, pathToFileSecond, format);
      const expectedResult = getExpectedResult(format);

      expect(currentResult).toBe(expectedResult);
    },
  );
});
