import { load } from "js-yaml";

const parse = (data, format) => {
    switch (format) {
      case 'json':
        return JSON.parse(data);
      case 'yaml':
        return load(data);
      case 'yml':
        return load(data);
      default:
        throw new Error(`Unknown format: ${format}! Check supported formats`);
    }
  }

export default parse