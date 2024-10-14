import _ from 'lodash';

const formatOfValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `${value}`;
  }
  return value;
};

const diffFormattedPlain = (diffTree) => {

};

export default diffFormattedPlain;
