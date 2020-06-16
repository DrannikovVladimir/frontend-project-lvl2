import renderPlain from './plain.js';
import renderTree from './stylish.js';
import renderJson from './json.js';

const render = (treeAst, format) => {
  switch (format) {
    case 'nested':
      return renderTree(treeAst);
    case 'plain':
      return renderPlain(treeAst);
    case 'json':
      return renderJson(treeAst);
    default:
      throw new Error(`Error! Format '${format}' is unknown.`);
  }
};

export default render;
