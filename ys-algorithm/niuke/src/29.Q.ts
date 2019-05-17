/**
 * 求一颗完全二叉树的节点数(要求时间复杂度 小于O(N))
 */


import {BinaryTree, buildTree} from './22.Q';


/**
 * 求个数
 * @param root 
 */
export function getTreeNumbers (root: BinaryTree<number>): number {
  if (!root) return 0;

  return bs(root, 1, mostLeftLevel(root, 1));

  function bs (head: BinaryTree<number>, startLevel: number, totalLevel: number): number {
    if (startLevel === totalLevel) {
      return 1;
    }

    // 当前节点的右节点 的左子树的层数和总层数一致，说明当前节点的左子树都是满的
    if (mostLeftLevel(head.right, startLevel + 1) === totalLevel) {
      return (1 << (totalLevel - startLevel)) + bs(head.right, startLevel + 1, totalLevel); 
    } else {
      // 否则说明 当前节点的右子树是满的
      return (1 << (totalLevel - startLevel - 1)) +  bs(head.left, startLevel + 1, totalLevel); 
    }
  }
}


/**
 * 获得当前节点左子树中的层数
 * @param head 
 * @param startLevel {起始的层级}
 */
function mostLeftLevel (head: BinaryTree<number>, startLevel: number): number {
  while (head) {
    startLevel++;
    head = head.left;
  }
  return startLevel - 1;
}





let preOrder = [1, 2, 4, 5, 3, 6, 7];
let inOrder = [4, 2, 5, 1, 6, 3, 7];
let root = buildTree(preOrder, inOrder);

console.log('完全二叉树节点个数: ', getTreeNumbers(root));