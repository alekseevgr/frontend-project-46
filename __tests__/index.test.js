import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testsJson = [
{
  file1: 'file3.json', file2: 'file4.json', formatter: 'stylish', output: 'testTreeJson.txt'
},
{
  file1: 'file3.json', file2: 'file4.json', formatter: 'plain', output: 'plainTest.txt',
},
{
  file1: 'file3.json', file2: 'file4.json', formatter: 'json', output: 'outputresult.json',
},
{
  file1: 'file3.json', file2: 'file4.json', output: 'testTreeJson.txt',
}
]
const testsYaml = [
    {
      file1: 'file3.yml', file2: 'file4.yml', formatter: 'stylish', output: 'testTreeJson.txt'
    },
    {
      file1: 'file3.yml', file2: 'file4.yml', formatter: 'plain', output: 'plainTest.txt',
    },
    {
      file1: 'file3.yml', file2: 'file4.yml', formatter: 'json', output: 'outputresult.json',
    },
    {
      file1: 'file3.yml', file2: 'file4.yml', output: 'testTreeJson.txt',
    }
]
test.each(testsJson)('json tests', ({
  file1, file2, formatter, output
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
})
test.each(testsYaml)('yaml tests', ({
  file1, file2, formatter, output
}) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFile(output);
  const result = genDiff(filepath1, filepath2, formatter);
  expect(result).toEqual(expected);
})