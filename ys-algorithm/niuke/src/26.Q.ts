/**
 * 判断是否是平衡二叉树(所有节点的左右子树都平衡，并且高度差不大于1)
 */

import {BinaryTree, buildTree} from './22.Q';

interface Data {
  balanceStatus: boolean;
  level: number;
}

/**
 * 判断是否是平衡二叉树
 * 递归返回每个节点的平衡情况和树的层次
 * @param node 
 */
export function isBalanceTree (node: BinaryTree<number>): Data {
  if (!node) return {balanceStatus: true, level: 0};

  let left = isBalanceTree(node.left);
  if (!(left.balanceStatus)) {
    return {balanceStatus: false, level: 0};
  }

  let right = isBalanceTree(node.right);
  if (!(right.balanceStatus)) {
    return {balanceStatus: false, level: 0};
  }

  if (Math.abs(left.level - right.level) > 1) {
    return {balanceStatus: false, level: 0};
  }

  return {
    balanceStatus: true,
    level: Math.max(left.level, right.level) + 1
  }
}

/*****************test ****************/

let preOrder = [1, 2, 4, 5, 3, 6, 7];
let inOrder = [4, 2, 5, 1, 6, 3, 7];
let root = buildTree(preOrder, inOrder);

console.log(isBalanceTree(root));