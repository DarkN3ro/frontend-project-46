import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const viewFormat = (differences, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(differences);
    case 'json':
      return json(differences);
    default:
      return stylish(differences);
  }
};

export default viewFormat;
