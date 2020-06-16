import _ from 'lodash';

const stringify = (item) => (_.isObject(item) ? '[complex value]' : item);

const renderPlain = (treeAst) => {
  const iter = (data, pathName) => {
    const result = data.filter((node) => node.status !== 'unchanged').map((node) => {
      const {
        name, status, value, valueBefore, valueAfter, children,
      } = node;
      const fullName = pathName ? [...pathName, name].join('.') : name;
      switch (status) {
        case 'added':
          return `Property ${fullName} was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property ${fullName} was deleted`;
        case 'changed':
          return `Property ${fullName} was changed from '${stringify(valueBefore)}' to '${stringify(valueAfter)}'`;
        case 'hasChildren':
          return iter(children, [...pathName, name]);
        default:
          throw new Error(`Error! Status '${status}' is unknown.`);
      }
    });
    return result.join('\n');
  };
  return iter(treeAst, []);
};

export default renderPlain;
