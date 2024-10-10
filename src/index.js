const formatValue = (value, nested) => {
  if (typeof value === 'object' && value !== null) {
    return iter(value, value, nested);
  }
  return value;
};

export default formatValue;
