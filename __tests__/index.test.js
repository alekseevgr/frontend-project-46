import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const correctStylish = readFile('stylishResult.txt')
const correctPlain = readFile('plainResult.txt')
const correctJson = readFile('jsonResult.json')

test.each(['json', 'yml'])('gendiff %s', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file1.${format}`);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(correctStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(correctPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(correctJson);
  expect(genDiff(filepath1, filepath2)).toEqual(correctStylish);
})