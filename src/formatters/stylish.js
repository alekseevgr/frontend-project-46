import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2)
const stringify = (node, depth = 1) => {
  if (!_.isObject(node)){
    return node;
  }
  const bracketIndent = makeIndent(depth - 1);
  const lines  = Object.entries(node).map(([key, value]) => `${makeIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}  }`
  ].join('\n')

}

const stylish = (data) => {
  const iter = (innerData, depth) => {
  const {
  name, value, type, value1, value2, children,
  } = innerData
        switch (type) {
            case 'root': {
                const result = children.flatMap((child) => iter(child, depth + 1));
                return `{\n${result.join('\n')}\n}`
            }
            case 'nested': {
                const result = children.flatMap((child) => iter(child, depth + 1));
                return `${makeIndent(depth)}  ${name}: {\n${result.join('\n')}\n  ${makeIndent(depth)}}`
            }
            case 'deleted':
                return `${makeIndent(depth)}- ${name}: ${stringify(value, depth + 1)}`;
            case 'added':
                return `${makeIndent(depth)}+ ${name}: ${stringify(value, depth + 1)}`;
            case 'unchanged':
                return `${makeIndent(depth)}  ${name}: ${stringify(value, depth + 1)}`;
            case 'changed':
                return [
                  `${makeIndent(depth)}- ${name}: ${stringify(value1, depth + 1)}`, 
                  `${makeIndent(depth)}+ ${name}: ${stringify(value2, depth + 1)}`
                ];
            default:
                throw new Error(`Unknown type!`);
        }
    
      }
    return iter(data, 0)
};

export default stylish;