import _ from 'lodash';

const diffFormattedStylish = (diffTree, depth = 0) => {
  const entries = Object.entries(diffTree);
  const replacer = ' ';
  const spaceCount = 4;
  const retreat = replacer.repeat(depth * spaceCount);
  const displace = `${retreat}${replacer.repeat(spaceCount / 2)}`;

  const formatValue = (val, depths) => {
    if (_.isObject(val) && val !== null) {
      const spaces = replacer.repeat(depths * spaceCount);
      const entriesVal = Object.entries(val);
      const resul = ['{'];
      entriesVal.forEach(([key, vali]) => {
        if (_.isObject(val) && val !== null) {
          resul.push(`${spaces}    ${key}: ${formatValue(vali, depths + 1)}`);
        }
      });
      resul.push(`${spaces}}`);
      return resul.join('\n');
    }
    if (!_.isObject(val)) {
      return val;
    }
  };

  const result = ['{'];
  entries.forEach(([key, value]) => {
    if (value.type === 'nested') {
      result.push(`${displace}  ${key}: ${diffFormattedStylish(value.children, depth + 1)}`);
    } else if (value.type === 'changed') {
      result.push(`${displace}- ${key}: ${formatValue(value.oldValue, depth + 1)}\n${displace}+ ${key}: ${formatValue(value.newValue, depth + 1)}`);
    } else if (value.type === 'added') {
      result.push(`${displace}+ ${key}: ${formatValue(value.newValue, depth + 1)}`);
    } else if (value.type === 'deleted') {
      result.push(`${displace}- ${key}: ${formatValue(value.oldValue, depth + 1)}`);
    } else if (value.type === 'unchanged') {
      result.push(`${displace}  ${key}: ${formatValue(value.oldValue, depth + 1)}`);
    }
  });
  result.push(`${retreat}}`);
  return result.join('\n');
};
export default diffFormattedStylish;
