#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import diffValues from '../src/treeDiff.js';
import viewFormat from '../formatters/stylish.js';
import parseOfFile from '../src/parsers.js';

program
  .description('Compares two configuration files and shows a difference.');

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .helpOption('-h, --help ', 'output usage information')
  .action((filepath1, filepath2) => {
    const data1 = parseOfFile(filepath1);
    const data2 = parseOfFile(filepath2);
    const differences = diffValues(data1, data2);
    const formatted = viewFormat(differences);

    console.log(formatted);
  });

program.parse(process.argv);
export default viewFormat;
