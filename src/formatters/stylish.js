import _ from 'lodash';

const indent = (n) => ' '.repeat(n);

const stringify = (item, depth) => {
  if (!_.isObject(item)) {
    return item;
  }
  const result = Object.keys(item).map((key) => `${indent(depth + 8)}${key}: ${item[key]}`);
  return ['{', ...result, `${indent(depth + 4)}}`].join('\n');
};

const renderTree = (treeAst) => {
  const iter = (dataAST, depth) => {
    const result = dataAST.map((node) => {
      const {
        name, status, value, valueAfter, valueBefore, children,
      } = node;
      switch (status) {
        case 'added':
          return `${indent(depth + 2)}+ ${name}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${indent(depth + 2)}- ${name}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${indent(depth + 2)}  ${name}: ${stringify(value, depth)}`;
        case 'changed':
          return `${indent(depth + 2)}- ${name}: ${stringify(valueBefore, depth)}\n${indent(depth + 2)}+ ${name}: ${stringify(valueAfter, depth)}`;
        case 'hasChildren':
          return `${indent(depth + 2)}  ${name}: ${iter(children, depth + 4)}`;
        default:
          throw new Error(`Error! Status '${status}' is unknown.`);
      }
    });
    return ['{', ...result, `${indent(depth)}}`].join('\n');
  };
  return iter(treeAst, 0);
};

export default renderTree;
