export default block =>
  block.getType() === 'unstyled' &&
  block.getDepth() === 0 &&
  (block.getText() === '*' || block.getText() === '1.');
