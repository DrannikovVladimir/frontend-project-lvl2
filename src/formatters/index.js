import renderPlain from './plain.js';
import renderTree from './stylish.js';

const render = (treeAst, format) => {
  switch (format) {
    case 'tree':
      return renderTree(treeAst);
    case 'plain':
      return renderPlain(treeAst);
    default:
      return null;
  }
};

export default render;
