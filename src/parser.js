import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const strToNumber = (value) => {
  const num = parseFloat(value);
  return Number.isNaN(num) ? value : num;
};

const numberifyValues = (obj) => {
  const entries = _.entries(obj);
  const result = entries.reduce((acc, [key, value]) => {
    if (_.isObject(value)) {
      return { ...acc, [key]: numberifyValues(value) };
    }
    return { ...acc, [key]: strToNumber(value) };
  }, {});
  return result;
};

const parse = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return numberifyValues(ini.parse(data));
    default:
      throw new Error(`Error! Type ${type} is unknown.`);
  }
};

export default parse;
