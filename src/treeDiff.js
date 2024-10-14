import _ from 'lodash';

const diff = (object1, object2) => {
  const result = {};
  const allSortKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  allSortKeys.forEach((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (!_.isEqual(value1, value2) && _.isObject(value1) && _.isObject(value2)) {
      result[key] = { children: diff(value1, value2), type: 'nested' };
    } else if (!Object.hasOwn(object1, key)) {
      result[key] = { newValue: value2, type: 'added' };
    } else if (!Object.hasOwn(object2, key)) {
      result[key] = { oldValue: value1, type: 'deleted' };
    } else if (!_.isEqual(value1, value2)) {
      result[key] = { oldValue: value1, newValue: value2, type: 'changed' };
    } else {
      result[key] = { oldValue: value1, type: 'unchanged' };
    }
  });

  return result;
};

export default diff;

const data1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const data2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

//console.log(diff(data1, data2));
