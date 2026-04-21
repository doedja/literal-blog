import { visit } from 'unist-util-visit';

export function remarkImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url.startsWith('/images/')) {
        node.url = '../../../assets/images' + node.url.slice('/images'.length);
      }
    });
  };
}
