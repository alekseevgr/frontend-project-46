import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './getDiff.js';
import format from './formatters/index.js';

const getDataFormat = (filePath) => path.extname(filePath).slice(1);
const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => readFileSync(getAbsPath(filePath), { encoding: 'utf8' });

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const rawData1 = readFile(filePath1);
  const rawData2 = readFile(filePath2);
  const data1 = parse(rawData1, getDataFormat(filePath1));
  const data2 = parse(rawData2, getDataFormat(filePath2));
  const diff = buildDiffTree(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
