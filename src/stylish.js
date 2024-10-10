/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const genDiff = (data1, data2, replacer = ' ', spaceCount = 4) => {
  const iter = (obj1, obj2, depth) => {
    const result = ['{'];
    const retreat = replacer.repeat(depth * spaceCount);
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

    const formatValue = (value, nested) => {
      if (typeof value === 'object' && value !== null) {
        return iter(value, value, nested);
      }
      return value;
    };

    keys.forEach((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}  ${key}: ${iter(value1, value2, depth + 1)}`);
      } else if (!Object.hasOwn(obj2, key)) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}- ${key}: ${formatValue(value1, depth + 1)}`);
      } else if (!Object.hasOwn(obj1, key)) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}+ ${key}: ${formatValue(value2, depth + 1)}`);
      } else if (value1 !== value2) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}- ${key}: ${formatValue(value1, depth + 1)}`);
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}+ ${key}: ${formatValue(value2, depth + 1)}`);
      } else {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}  ${key}: ${formatValue(value1, depth + 1)}`);
      }
    });

    result.push(`${retreat}}`);
    return result.join('\n');
  };
  return iter(data1, data2, 0);
};

export default genDiff;
