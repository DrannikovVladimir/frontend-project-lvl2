import path from 'path';
import genDiff from '../src/index.js';

test('gendiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const fileBefore = getFixturePath('before.json') || getFixturePath('before.yml') || getFixturePath('before.ini');
  const fileAfter = getFixturePath('after.json') || getFixturePath('after.yml') || getFixturePath('after.ini');
  const result =
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
  expect(genDiff(fileBefore, fileAfter)).toEqual(result);
});
