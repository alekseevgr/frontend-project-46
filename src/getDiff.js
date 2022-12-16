import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const sortKeys = _.sortBy(_.union(keys1, keys2));
  return sortKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        name: key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        name: key,
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        name: key,
        value: data2[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed',
        name: key,
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      type: 'unchanged',
      name: key,
      value: data1[key],
    };
  });
};

export default (data1, data2) => ({ type: 'root', children: buildTree(data1, data2) });
