#!/usr/bin/env node
import { Command } from "commander";
import genDiff from "../index.js";
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .parse()
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });