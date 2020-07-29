/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * 递归方式
 */
var maxDepth = function(root) {
  if (!root) return 0;

  let lmax = 0, rmax = 0;
  lmax = maxDepth(root.left);
  rmax = maxDepth(root.right);
  return Math.max(lmax, rmax) + 1;
};



// bfs  广度优先遍历，一层一层的遍历
var maxDepth2 = function (root) {
  if (!root) return 0;

  let queue = [];
  let deeps = 0;
  queue.push(root);

  while (queue.length > 0) {
    let size = queue.length;

    while (size > 0) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      } 
      if (node.right) {
        queue.push(node.right);
      }
      size--;
    }
    deeps++;
  }

  return deeps;
};
