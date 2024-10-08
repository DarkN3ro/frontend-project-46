/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const result = [];
  const keysSort = _.union(Object.keys(obj1), Object.keys(obj2));
  const keys = _.sortBy(keysSort);
  result.push('{');
  for (const key of keys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push(`    + ${key}: ${obj2[key]}`);
    } else if (!Object.hasOwn(obj2, key)) {
      result.push(`    - ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      result.push(`    - ${key}: ${obj1[key]}`);
      result.push(`    + ${key}: ${obj2[key]}`);
    } else {
      result.push(`      ${key}: ${obj1[key]}`);
    }
  }
  result.push('  }');
  return result.join('\n');
};

export default genDiff;
