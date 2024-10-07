#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import process from 'process';
import { parseOfFile } from '../bin/index.js';

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
    console.log(parseOfFile(filepath1));
    console.log(parseOfFile(filepath2));
  });

program.parse(process.argv);

//console.log(path.resolve());
//console.log('Current working directory: ', process.cwd());