import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const readFile1 = readFileSync("file1.json", { encoding: 'utf8' })
const readFile2 = readFileSync("file2.json", { encoding: 'utf8' })
const getObject1 = JSON.parse(readFile1);
const getObject2 = JSON.parse(readFile2);

const getDiffInfo = (file1, file2) => {
const keys1 = _.keys(file1)
const keys2 = _.keys(file2)
const sortKeys = _.sortBy(_.union(keys1, keys2))
const result = sortKeys.map((key) => {
    if (!_.has(file2, key)) {
      return {
        type: 'deleted',
        key,
        value: file1[key],
      };
    }
    if (!_.has(file1, key)) {
      return {
        type: 'added',
        key,
        value: file2[key],
      };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        type: 'changed',
        key,
        value1: file1[key],
        value2: file2[key],
      };
    }
    return {
      type: 'unchanged',
      key,
      value: file1[key],
    };
  });
  return result
}
const getDiff = (getDiffInfo) => {
    const result = getDiffInfo.map((diff) => {
        const typediff = diff.type;
        switch (typediff) {
            case 'deleted':
                return ` - ${diff.key}: ${diff.value}`;
            case 'added':
                return ` + ${diff.key}: ${diff.value}`;
            case 'changed':
                return ` - ${diff.key}: ${diff.value1} \n + ${diff.key}: ${diff.value2}`;
            case 'unchanged':
                return `   ${diff.key}: ${diff.value}`;
            default:
                return null;
        }
    });
    return `{\n${result.join('\n')}\n}`;
}
console.log(getDiff(getDiffInfo(getObject1, getObject2)))