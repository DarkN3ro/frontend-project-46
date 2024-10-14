import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parseOfFile from '../src/parsers.js';
import diffValues from '../src/treeDiff.js';
import viewFormat from '../formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const resultNested = readFile('compare.json');
const fileJson1 = parseOfFile('firstfilepath1.json');
const fileJson2 = parseOfFile('firstfilepath2.json');
const fileYml1 = parseOfFile('firstfilepath1.yml');
const fileYml2 = parseOfFile('firstfilepath2.yml');
const fileNestedJson1 = parseOfFile('filepath1.json');
const fileNestedJson2 = parseOfFile('filepath2.json');
const fileNestedYml1 = parseOfFile('filepath1.yml');
const fileNestedYml2 = parseOfFile('filepath2.yml');
const result = readFile('firstcompare.json');
test('testing json', () => {
  expect(viewFormat(diffValues(fileJson1, fileJson2))).toEqual(result);
});
test('testing yml', () => {
  expect(viewFormat(diffValues(fileYml1, fileYml2))).toEqual(result);
});
test('testing json/yml', () => {
  expect(viewFormat(diffValues(fileJson1, fileYml2))).toEqual(result);
});
test('testing json nested', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedJson2))).toEqual(resultNested);
});
test('testing yml nested', () => {
  expect(viewFormat(diffValues(fileNestedYml1, fileNestedYml2))).toEqual(resultNested);
});
test('testing json/yml nested', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedYml2))).toEqual(resultNested);
});
