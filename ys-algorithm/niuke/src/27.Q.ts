/**
 * 搜索二叉树(中序遍历 升序)
 */

import {BinaryTree, buildTree} from './22.Q';


/**
 * 是否是 搜索二叉树
 * @param root 
 */
export function isBST (root: BinaryTree<number>) :boolean {
  if (!root) return false;

  let last = Number.MIN_VALUE;
  let stack: BinaryTree<number> [] = [];

  /**
   * 对中序遍历 进行简单修改
   */
  while (stack.length > 0 || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      let current = stack.pop();

      // 如果当前值 大于上一个，那么就继续
      if (current.value > last) {
        last = current.value;
      } else {
        return false;
      }

      current = current.right;
    }
  }
  return true;
}


let preOrder = [1, 2, 4, 5, 3, 6, 7];
let inOrder = [4, 2, 5, 1, 6, 3, 7];
let root = buildTree(preOrder, inOrder);

// root = buildTree([4,2,1,3,6,5,7], [1,2,3,4,5,6,7]);
console.log("搜索二叉树: ", isBST(root));



