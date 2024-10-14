import _ from 'lodash';

const formatOfValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const diffFormattedPlain = (diffTree, acc = []) => {
  const entriesVal = Object.entries(diffTree);
  const result = [];
  entriesVal.forEach(([key, value]) => {
    const keyWay = [...acc, key].join('.');
    if (value.type === 'nested') {
      result.push(diffFormattedPlain(value.children, [...acc, key]));
    } if (value.type === 'added') {
      result.push(`Property '${keyWay}' was added with value: ${formatOfValue(value.newValue)}`);
    } else if (value.type === 'deleted') {
      result.push(`Property '${keyWay}' was removed`);
    } else if (value.type === 'changed') {
      result.push(`Property '${keyWay}' was updated. From ${formatOfValue(value.oldValue)} to ${formatOfValue(value.newValue)}`);
    }
  });
  return result.join('\n');
};

export default diffFormattedPlain;
