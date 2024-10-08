import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parseOfFile from '../src/parse.js';
import genDiff from '../bin/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = parseOfFile('firstfilepath1.json');
const fileJson2 = parseOfFile('firstfilepath2.json');
const fileYml1 = parseOfFile('firstfilepath1.yml');
const fileYml2 = parseOfFile('firstfilepath2.yml');
const result = readFile('firstcompare.json');

test('testing json', () => {
  expect(genDiff(fileJson1, fileJson2)).toEqual(result);
});
test('testing yml', () => {
  expect(genDiff(fileYml1, fileYml2)).toEqual(result);
});
test('testing json/yml', () => {
  expect(genDiff(fileJson1, fileYml2)).toEqual(result);
});
