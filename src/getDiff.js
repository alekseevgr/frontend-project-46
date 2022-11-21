import _ from 'lodash';

export const getDiffInfo = (file1, file2) => {
    const keys1 = _.keys(file1)
    const keys2 = _.keys(file2)
    const sortKeys = _.sortBy(_.union(keys1, keys2))
    const getInfo = sortKeys.map((key) => {
        if (_.isObject(file1) && _.isObject(file2)){
          return {
            type: 'nested',
            name: key,
            children: getDiffInfo(file1[key], file2[key])
          }
        }
        if (!_.has(file2, key)) {
          return {
            type: 'deleted',
            name: key,
            value: file1[key],
          };
        }
        if (!_.has(file1, key)) {
          return {
            type: 'added',
            name: key,
            value: file2[key],
          };
        }
        if (!_.isEqual(file1[key], file2[key])) {
          return {
            type: 'changed',
            name: key,
            value1: file1[key],
            value2: file2[key],
          };
        }
        return {
          type: 'unchanged',
          name: key,
          value: file1[key],
        };
      });
      return getInfo;
    }
const indentSize = 4;
const getIndent = (count) => ' '.repeat(count * indentSize)
const getValue = (node, depth) => {
  if (!_.isObject(node)){
    return node;
  }
  const bracketIndent = getIndent(depth - 1);
  const lines  = Object.entries(node).map(([key, value]) => `${getIndent(depth)}${key}: ${getValue(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')

}

const getDiff = (getDiffInfo, depth = 1) => {
    const indent = getIndent(depth).slice(0, getIndent(depth) - 2)
    const bracketIndent = getIndent(depth - 1)
    const result = getDiffInfo.flatMap((diff) => {
        const typediff = diff.type;
        switch (typediff) {
            case 'nested':
                return `${indent}   ${diff.name}: ${getDiff(diff.children, depth + 1)}`
            case 'deleted':
                return `${indent} - ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            case 'added':
                return `${indent} + ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            case 'changed':
                return [
                  `${indent}- ${diff.name}: ${getValue(diff.value1, depth + 1)}`, 
                  `${indent}+ ${diff.name}: ${getValue(diff.value2, depth + 1)}`
                ];
            case 'unchanged':
                return `${indent}   ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            default:
                return null;
        }
    });
return `{\n${result.join('\n')}\n}`;
}

export default getDiff