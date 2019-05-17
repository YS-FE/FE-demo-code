
/**
 * 完全二叉树 (除最后一层之外，所有层都是满的)
 */

import {BinaryTree, buildTree} from './22.Q';


/**
 * 是否是完全二叉树
 * 判断条件：
 * 1. 如果某个节点 有right节点，但是没有left节点，返回false
 * 2. 如果当前节点 没有left并且没有right节点，那么后边的所有节点都必须是叶子节点
 * 3. 如果当前节点 有left但是没有right节点，那么后边的所有节点都必须是叶子节点
 * 
 * @param root 
 */
export function isCBT (root: BinaryTree<number>): boolean {
  if (!root) return false;

  let l = null, r = null, shouldBeLeaf = false;
  let queue: BinaryTree<number>[] = [];
  queue.push(root);

  while (queue.length > 0) {
    let curr = queue.shift();
    l = curr.left;
    r = curr.right;

    if ((l === null && r !== null) || (shouldBeLeaf && (l !== null || r !== null))) {
      return false;
    }

    if (l !== null) {
      queue.push(l);
    }

    if (r !== null) {
      queue.push(r);
    } else {
      //当缺少右节点时，后边的节点都必须为叶子节点
      shouldBeLeaf = true;
    }
  }

  return true;
}

/************ test **************/

let preOrder = [1, 2, 4, 5, 3, 6, 7];
let inOrder = [4, 2, 5, 1, 6, 3, 7];
let root = buildTree(preOrder, inOrder);

console.log("完全二叉树: ", isCBT(root));