import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown formatName: ${formatName}! Check supported formats`);
  }
};

export default format;
