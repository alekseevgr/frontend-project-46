import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 2) => replacer.repeat(depth * spacesCount)
const stringify = (node, depth = 1) => {
  if (!_.isObject(node)){
    return node;
  }
  const bracketIndent = makeIndent(depth);
  const lines  = Object.entries(node).map(([key, value]) => `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')

}

const stylish = (data) => {
  const iter = (innerData, depth) => {
  const {
  name, value, type, value1, value2, children,
  } = innerData
    const indent = makeIndent(depth);
        switch (type) {
            case 'root': {
                const result = children.flatMap((child) => iter(child, depth + 1));
                return `{\n${result.join('\n')}\n}`
            }
            case 'nested': {
                const result = children.flatMap((child) => iter(child, depth + 1));
                return `${indent}  ${name}: {\n${result.join('\n')}\n${indent}}`
            }
            case 'deleted':
                return `${indent}- ${name}: ${stringify(value, depth)}`;
            case 'added':
                return `${indent}+ ${name}: ${stringify(value, depth)}`;
            case 'unchanged':
                return `${indent}  ${name}: ${stringify(value, depth)}`;
            case 'changed':
                return [
                  `${indent}- ${name}: ${stringify(value1, depth)}`, 
                  `${indent}+ ${name}: ${stringify(value2, depth)}`
                ];
            default:
                throw new Error(`Unknown type!`);
        }
    
      }
    return iter(data, 0)
};

export default stylish;