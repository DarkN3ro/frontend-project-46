import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const json1 = readFile('filepath1.json');
const json2 = readFile('filepath2.json');
//console.log(getFixturePath('filepath1.json'));
//console.log(json2);

const parseOfFile = (filename) => {
  const data = JSON.parse(readFile(filename));
  return data; 
}

//const filename = 'filepath1.json';
//console.log(parseOfFile(filename));

//const obj1 = JSON.parse(json1);
//console.log(obj1);
//const obj2 = JSON.parse(json2);
//console.log(obj2);


export { parseOfFile };
