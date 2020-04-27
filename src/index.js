import program from 'commander';

const getProgram = () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format');

  program.parse(process.argv);
};

export default getProgram;
