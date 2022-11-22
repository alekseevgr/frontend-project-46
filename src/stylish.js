import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2)
const getValue = (node, depth = 1) => {
  if (!_.isObject(node) || node === null){
    return node;
  }
  const bracketIndent = makeIndent(depth - 1);
  const lines  = Object.entries(node).map(([key, value]) => `${makeIndent(depth)}${key}: ${getValue(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')

}

const stylish = (getDiffInfo, depth = 1) => {
    const indent = makeIndent(depth);
    const result = getDiffInfo.flatMap((diff) => {
        const typediff = diff.type;
        switch (typediff) {
            case 'nested':
                return `${indent}  ${diff.name}: ${stylish(diff.children, depth + 1)}`
            case 'deleted':
                return `${indent}- ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            case 'added':
                return `${indent}+ ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            case 'unchanged':
                return `${indent}  ${diff.name}: ${getValue(diff.value, depth + 1)}`;
            case 'changed':
                return [
                  `${indent}- ${diff.name}: ${getValue(diff.value1, depth + 1)}`, 
                  `${indent}+ ${diff.name}: ${getValue(diff.value2, depth + 1)}`
                ];
            default:
                return null;
        }
    });
return `{\n${result.join('\n')}\n}`;
};

export default stylish;