import _ from "lodash";

const format = (value) => {
    if (_.isObject(value)) {
        return '[complex value]';
    }
    if (_.isString(value)) {
        return `'${value}'`;
    }
    return value;
  };
const plain = (diff, fileName = []) => {
    const {
        type, children, name, value, value1, value2
    } = diff
        const nestedKeys = [...fileName, name]
        const namePath = nestedKeys.join('.')
        switch (type) {
            case 'root': {
                const tree = children
                .filter((child) => child.type !=='unchanged')
                .flatMap((child) => plain(child, []));
                return tree.join('\n');
            }
            case 'nested': {
                const result = children
                .filter((child) => child.type !== 'unchanged')
                .flatMap((child) => plain(child, nestedKeys));
                return result.join('\n');
            }
            case 'deleted':
                return `Property '${namePath}' was removed`;
            case 'added':
                return `Property '${namePath}' was added with value: ${format(value)}`;
            case 'changed':
                return `Property '${namePath}' was updated. From ${format(value1)} to ${format(value2)}`
            default:
                throw new Error(`Unknown type!`);;
        }
};

export default plain