
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */


 /**
  * 二叉树,前序遍历
  * @param {*} root 
  */
 var preorderTraversal = function (root) {
   if (!root) return [];

   let stack = [];
   let result = [];

   while (stack.length) {
     if ((stack[stack.length - 1]).left) {
       stack.push((stack[stack.length - 1]).left);
     }

     if ((stack[stack.length - 1]).right) {
      stack.push((stack[stack.length - 1]).right);
    }

    result.push(stack.pop());
   }

   return result;
 }


/**
 * 二叉树中序遍历，非递归版，栈
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  if (!root) return [];

  let result = [];
  let stack = [];
  stack.push(root);

  while (stack.length) {
    while ((stack[stack.length - 1]).left) {
      stack.push((stack[stack.length - 1]).left);
    }

    while (stack.length) {
      let node = stack.pop();
      result.push(node.val);

      if (node.right) {
        stack.push(node.right);
        break;
      }
    }
  }

  return result;
};




/**
 * 二叉树后序遍历，非递归版，栈
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return [];

  let result = [];
  let stack = [];
  let lastPopNode = null;
  stack.push(root);

  while (stack.length) {
    while ((stack[stack.length - 1]).left) {
      stack.push((stack[stack.length - 1]).left);
    }

    while (stack.length) {
      if ((lastPopNode === ((stack[stack.length - 1]).right)) || 
      (!(stack[stack.length - 1]).right)) {
        let currNode = stack.pop();
        lastPopNode = currNode;
        result.push(currNode);
      } else if ((stack[stack.length - 1]).right) {
        stack.push((stack[stack.length - 1]).right);
        break;
      }
    }
  }

  return result;
};