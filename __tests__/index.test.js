import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const treeStylish = [
{
  file1: 'file3.json', file2: 'file4.json', formatter: 'stylish', output: 'testTreeJson.txt'
},
{
  file1: 'file3.yml', file2: 'file4.yaml', formatter: 'stylish', output: 'testTreeJson.txt'
},
]
const plain = [
  {
    file1: 'file3.json', file2: 'file4.json', formatter: 'plain', output: 'plainTest.txt',
  },
]
const json = [
  {
    file1: 'file3.json', file2: 'file4.json', formatter: 'json', output: 'outputresult.json',
  },
]
test.each(treeStylish)('json yaml tree stylish test', ({
  file1, file2, formatter, output
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
});

test.each(plain)('plain test', ({
  file1, file2, formatter, output
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
});

test.each(json)('json test', ({
  file1, file2, formatter, output
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
});