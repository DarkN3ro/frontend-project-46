#!/usr/bin/env node
import { program } from 'commander';
// import path from 'path';
import process from 'process';
import { parseOfFile, genDiff } from './index.js';

program
  .description('Compares two configuration files and shows a difference.');

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  // .argument('<filepath1> <filepath2>')
  .helpOption('-h, --help ', 'output usage information')
  .action((filepath1, filepath2) => {
    const one = parseOfFile(filepath1);
    const two = parseOfFile(filepath2);
    console.log(genDiff(one, two));
  });

program.parse(process.argv);

// console.log(path.resolve());
// console.log('Current working directory: ', process.cwd());
