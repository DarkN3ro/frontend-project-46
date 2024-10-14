import _ from 'lodash';

const diffFormattedStylish = (diffTree, depth = 0) => {
  const entries = Object.entries(diffTree);
  const replacer = ' ';
  const spaceCount = 4;
  const retreat = replacer.repeat(depth * spaceCount);
  const displace = `${retreat}${replacer.repeat(spaceCount / 2)}`;

  // eslint-disable-next-line consistent-return
  const formatValue = (val, depths) => {
    if (_.isObject(val) && val !== null) {
      const spaces = replacer.repeat(depths * spaceCount);
      const entriesVal = Object.entries(val);
      const resul = ['{'];
      entriesVal.forEach(([key, value]) => {
        resul.push(`${spaces}    ${key}: ${formatValue(value, depths + 1)}`);
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
    const addedNode = `${displace}+ ${key}: ${formatValue(value.newValue, depth + 1)}`;
    const deletedNode = `${displace}- ${key}: ${formatValue(value.oldValue, depth + 1)}`;
    const unchangedNode = `${displace}  ${key}: ${formatValue(value.oldValue, depth + 1)}`;
    if (value.type === 'nested') {
      result.push(`${displace}  ${key}: ${diffFormattedStylish(value.children, depth + 1)}`);
    } else if (value.type === 'changed') {
      result.push(deletedNode, addedNode);
    } else if (value.type === 'added') {
      result.push(addedNode);
    } else if (value.type === 'deleted') {
      result.push(deletedNode);
    } else if (value.type === 'unchanged') {
      result.push(unchangedNode);
    }
  });
  result.push(`${retreat}}`);
  return result.join('\n');
};
export default diffFormattedStylish;
