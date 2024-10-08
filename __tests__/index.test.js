import genDiff from '../bin/index.js';
import { parseOfFile, readFile } from '../src/parse.js';

const file1 = parseOfFile('filepath1.json');
const file2 = parseOfFile('filepath2.json');
const result = readFile('compare.json');

test('index', () => {
  expect(genDiff(file1, file2)).toEqual(result);
});
