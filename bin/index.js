/* eslint-disable no-restricted-syntax */
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// console.log(getFixturePath('filepath1.json'));
// console.log(json2);

const parseOfFile = (filename) => {
  const data = JSON.parse(readFile(filename));
  return data;
};

const genDiff = (obj1, obj2) => {
  const result = ['{'];
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keysSort = _.union(keys1, keys2);
  const keys = _.sortBy(keysSort);

  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
    } else if (!Object.hasOwn(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      result.push(`  - ${key}: ${obj1[key]}`);
      result.push(`  + ${key}: ${obj2[key]}`);
    } else {
      result.push(`    ${key}: ${obj1[key]}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

export { parseOfFile, genDiff };

/* const result = {};
const keys1 = Object.keys(obj1);
const keys2 = Object.keys(obj2);
const keysSort = _.union(keys1, keys2);
const keys = _.sortBy(keysSort)

for (const key of keys) {
  if (!Object.hasOwn(obj1, key)) {
    result[`+ ${key}`] = obj2[key];
  } else if (!Object.hasOwn(obj2, key)) {
    result[`- ${key}`] = obj1[key];
  } else if (obj1[key] !== obj2[key]) {
    result[`- ${key}`] = obj1[key];
    result[`+ ${key}`] = obj2[key];
  } else {
    result[`  ${key}`] = obj1[key];
  }
}

  return result

*/

// const filename = 'filepath1.json';
// console.log(parseOfFile(filename));

// const obj1 = JSON.parse(json1);
// console.log(obj1);
// const obj2 = JSON.parse(json2);
// console.log(obj2);

/* {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true
} */
