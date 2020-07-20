#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<pathToFile1> <pathToFile2>')
  .option('-f, --format [type]', 'output format')
  .action((pathToFile1, pathToFile2) => {
    const result = genDiff(pathToFile1, pathToFile2, program.format);
    console.log(result);
  });

program.parse(process.argv);
