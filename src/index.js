import { readFileSync } from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getDiffInfo  from './getDiff.js';
import getFormat from './formatters/index.js';

const getFileFormat = (filePath) => path.extname(filePath).slice(1);
const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath)
const readFile = (filePath) => readFileSync(getAbsPath(filePath), { encoding: 'utf8' })

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const readFilepath1 = readFile(filePath1);
  const readFilepath2 = readFile(filePath2)
  const file1 = getParser(readFilepath1, getFileFormat(filePath1));
  const file2 = getParser(readFilepath2, getFileFormat(filePath2));
  const diff = getDiffInfo(file1, file2)
  return getFormat(diff, format)
}

export default genDiff;