#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format', 'output format')
  .action((a, b) => {
    const result = genDiff(a, b);
    console.log(result);
  });

program.parse(process.argv);
