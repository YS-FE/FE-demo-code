/**
 * 找到 某个节点的后继节点(中序遍历中的顺序)
 * 
 */


export class SpecialBinaryTree<T> {
  public parent: SpecialBinaryTree<T>;
  public left: SpecialBinaryTree<T>;
  public right: SpecialBinaryTree<T>;
  public value: T;
  constructor(value: T) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}


/**
 * 获取后继节点
 * @param node 
 */
function getNextNode (node: SpecialBinaryTree<number>): SpecialBinaryTree<number> {
  if (!node) return null;

  if (node.right) {
    return getMostLeft(node.right);
  } else {
    /**
     * 当前节点没有右节点，那么找到的第一个node节点是某个parent节点的left节点时, parent即为后继节点
     */
    let parent = node.parent;
    while (parent && (parent.left !== node)) {
      node = parent;
      parent = parent.parent;
    }
    return parent;
  }
}


/**
 * 获取前驱节点
 * @param node 
 */
function getPreNode (node: SpecialBinaryTree<number>): SpecialBinaryTree<number> {
  if (!node) return null;

  if (node.parent) {
    if (node.left) {
      //找到左节点中 最右的一个
      return getMostRight(node.left);
    } else {
      //当前节点没有左节点, 找到某个节点ndoe是 parent节点的right节点，那么parent即为前驱节点
      let parent = node.parent;
      while (parent && parent.right !== node) {
        node = parent;
        parent = parent.parent;
      }
      return parent;
    }
  } else {
    return null;
  }
}



/**
 * 找到一个节点的左子树中最左的一个
 * @param node 
 */
function getMostLeft (node: SpecialBinaryTree<number>): SpecialBinaryTree<number> {
  if (!node) return null;

  while (node.left) {
    node = node.left;
  }
  return node;
}

/**
 * 找到一个节点的右子树中最右的一个
 * @param node 
 */
function getMostRight (node: SpecialBinaryTree<number>): SpecialBinaryTree<number> {
  if (!node) return null;

  while (node.right) {
    node = node.right;
  }
  return node;
}




let root = new SpecialBinaryTree<number>(1);
root.left = new SpecialBinaryTree<number>(2);
root.right = new SpecialBinaryTree<number>(3);
root.left.parent = root;
root.right.parent = root;

root.left.left = new SpecialBinaryTree<number>(4);
root.left.right = new SpecialBinaryTree<number>(5);
root.left.left.parent = root.left;
root.left.right.parent = root.left;


root.right.left = new SpecialBinaryTree<number>(6);
root.right.right = new SpecialBinaryTree<number>(7);
root.right.left.parent = root.right;
root.right.right.parent = root.right;

console.log(getNextNode(root.left.right));
console.log(getPreNode(root.left.right));












