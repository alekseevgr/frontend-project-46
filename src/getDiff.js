import _ from 'lodash';

const getDiffInfo = (file1, file2) => {
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


export default getDiffInfo