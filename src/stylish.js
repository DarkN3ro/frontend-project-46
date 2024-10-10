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
      const mark = {
        added: '+',
        deleted: '-',
        unchanged: ' ',
      };

      const nested = typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null;
      const added = !Object.hasOwn(obj1, key);
      const deleted = !Object.hasOwn(obj2, key);
      const changed = value1 !== value2;

      switch (true) {
        case nested:
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.unchanged} ${key}: ${iter(value1, value2, depth + 1)}`);
          break;

        case added:
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.added} ${key}: ${formatValue(value2, depth + 1)}`);
          break;

        case deleted:
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.deleted} ${key}: ${formatValue(value1, depth + 1)}`);
          break;

        case changed:
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.deleted} ${key}: ${formatValue(value1, depth + 1)}`);
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.added} ${key}: ${formatValue(value2, depth + 1)}`);
          break;

        default:
          result.push(`${retreat}${replacer.repeat(spaceCount / 2)}${mark.unchanged} ${key}: ${formatValue(value1, depth + 1)}`);
          break;
      }
    });

    result.push(`${retreat}}`);
    return result.join('\n');
  };
  return iter(data1, data2, 0);
};

export default genDiff;
