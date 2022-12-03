import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2)
const stringify = (node, depth = 1) => {
  if (!_.isObject(node)){
    return node;
  }
  const bracketIndent = makeIndent(depth - 1);
  const lines  = Object.entries(node).map(([key, value]) => `${makeIndent(depth)}${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`
  ].join('\n')

}

const stylish = (tree, depth = 1) => {
  const {
  name, value, type, value1, value2, children,
  } = tree
    const indent = makeIndent(depth);
        switch (type) {
            case 'root': {
                const result = children.flatMap((child) => stylish(child, depth));
                return `{\n${result.join('\n')}\n}`
            }
            case 'nested': {
                const result = children.flatMap((child) => stylish(child, depth + 1));
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
};

export default stylish;