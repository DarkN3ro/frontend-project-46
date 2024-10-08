import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parseOfFile = (filename) => {
  const pathOfFile = path.resolve('__fixtures__', filename);
  const readFile = fs.readFileSync(pathOfFile, 'utf8');
  const format = path.extname(filename);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(readFile);
};

export default parseOfFile;
