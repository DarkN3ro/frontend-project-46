#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.');

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  // .argument('<filepath1> <filepath2>')
  .helpOption('-h, --help ', 'output usage information');

program.parse(process.argv);
