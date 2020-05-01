import path from 'path';
import genDiff from '../src/index.js';

test('gendiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const fileBefore = getFixturePath('before.json') || getFixturePath('before.yml');
  const fileAfter = getFixturePath('after.json') || getFixturePath('after.yml');
  const result =
`{
   host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 - follow: false
 + verbose: true
}`;
  expect(genDiff(fileBefore, fileAfter)).toEqual(result);
});

test('Error', () => {
  expect(() => {
    genDiff();
  }).toThrow('Files not found');
});
