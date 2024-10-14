import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import parseOfFile from '../src/parsers.js';
import diffValues from '../src/treeDiff.js';
import viewFormat from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileJson1 = parseOfFile('firstfilepath1.json');
const fileJson2 = parseOfFile('firstfilepath2.json');
const fileYml1 = parseOfFile('firstfilepath1.yml');
const fileYaml1 = parseOfFile('firstfilepath1.yaml');
const fileYml2 = parseOfFile('firstfilepath2.yml');

const fileNestedJson1 = parseOfFile('filepath1.json');
const fileNestedJson2 = parseOfFile('filepath2.json');
const fileNestedYml1 = parseOfFile('filepath1.yml');
const fileNestedYml2 = parseOfFile('filepath2.yml');
const resultNotNested = readFile('firstcompare.json');
const resultStylish = readFile('stylishCompare.json');
const resultPlain = readFile('plainCompare.json');
const resultJson = readFile('jsonCompare.json');
test('testing json', () => {
  expect(viewFormat(diffValues(fileJson1, fileJson2))).toEqual(resultNotNested);
});
test('testing yml', () => {
  expect(viewFormat(diffValues(fileYaml1, fileYml2))).toEqual(resultNotNested);
});
test('testing json/yml', () => {
  expect(viewFormat(diffValues(fileYml1, fileJson2))).toEqual(resultNotNested);
});
test('testing json nested, format "stylish"', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedJson2), 'stylish')).toEqual(resultStylish);
});
test('testing yml nested format "stylish"', () => {
  expect(viewFormat(diffValues(fileNestedYml1, fileNestedYml2), 'stylish')).toEqual(resultStylish);
});
test('testing json/yml nested, format "default"', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedYml2))).toEqual(resultStylish);
});
test('testing json nested, format "plain"', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedYml2), 'plain')).toEqual(resultPlain);
});
test('testing yml nested, format "json"', () => {
  expect(viewFormat(diffValues(fileNestedJson1, fileNestedYml2), 'json')).toEqual(resultJson);
});
