import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const parseOfFile = (filename) => {
  const data = readFile(filename);
  const format = path.extname(filename);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};
// console.log(parseOfFile('filepath1.json'));
// console.log(parseOfFile('filepath1.yml'));
export { parseOfFile, readFile };
