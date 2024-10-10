/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const mark = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const genDiff = (obj1, obj2) => {
  const replacer = ' ';
  const spaceCount = 4;
  const iter = (reObj1, reObj2, depth) => {
    const result = ['{'];
    const retreat = replacer.repeat(depth * spaceCount);
    const keysSort = _.union(Object.keys(reObj1), Object.keys(reObj2));
    const keys = _.sortBy(keysSort);

    const formatValue = (value, nested) => {
      if (typeof value === 'object' && value !== null) {
        return iter(value, value, nested);
      }
      return value;
    };

    keys.forEach((key) => {
      if (typeof reObj1[key] === 'object' && reObj1[key] !== null && typeof reObj2[key] === 'object' && reObj2[key] !== null) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}  ${key}: ${iter(reObj1[key], reObj2[key], depth + 1)}`);
      } else if (!Object.hasOwn(reObj2, key)) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.deleted} ${key}: ${formatValue(reObj1[key], depth + 1)}`);
      } else if (!Object.hasOwn(reObj1, key)) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.added} ${key}: ${formatValue(reObj2[key], depth + 1)}`);
      } else if (reObj1[key] !== reObj2[key]) {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.deleted} ${key}: ${formatValue(reObj1[key], depth + 1)}`);
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.added} ${key}: ${formatValue(reObj2[key], depth + 1)}`);
      } else {
        result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.unchanged} ${key}: ${formatValue(reObj1[key], depth + 1)}`);
      }
    });
    result.push(`${retreat}}`);
    return result.join('\n');
  };
  return iter(obj1, obj2, 0);
};

export default genDiff;
