import _ from 'lodash';

const space = (n) => ' '.repeat(n);

const stringify = (element, depth) => {
  if (!(element instanceof Object)) return element;
  const keys = Object.keys(element);
  const result = keys.map((key) => `${space(depth + 8)}${key}: ${element[key]}`);
  return ['{', ...result, `${space(depth + 4)}}`].join('\n');
};

const renderTree = (treeAST) => {
  const iter = (dataChildren, depth) => {
    const result = dataChildren.map((node) => {
      const {
        name, status, value, valueAfter, valueBefore, children,
      } = node;
      switch (status) {
        case 'hasChildren':
          return `${space(depth + 2)}  ${name}: ${iter(children, depth + 4)}`;
        case 'unchanged':
          return `${space(depth + 2)}  ${name}: ${stringify(value, depth)}`;
        case 'added':
          return `${space(depth + 2)}+ ${name}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${space(depth + 2)}- ${name}: ${stringify(value, depth)}`;
        case 'edited':
          return `${space(depth + 2)}- ${name}: ${stringify(valueBefore, depth)}\n${space(depth + 2)}+ ${name}: ${stringify(valueAfter, depth)}`;
        default: throw new Error(`Unknown status: '${status}'!`);
      }
    });
    return ['{', ...result, `${space(depth)}}`].join('\n');
  };
  return iter(treeAST, 0);
};

export default renderTree;
