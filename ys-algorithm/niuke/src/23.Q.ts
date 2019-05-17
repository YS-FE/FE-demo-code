/**
 * 二叉树 序列化、 反序列化
 */

import {BinaryTree, buildTree, printByPreOrder} from './22.Q';



/**
 * 递归 先序序列化
 * @param root 
 */
function preSerialize<T> (root: BinaryTree<T>): string {
  if (root === null) return '#_';

  let result = '';
  result =  root.value + '_';
  result += preSerialize(root.left);
  result += preSerialize(root.right);

  return result;
}


/**
 * 递归 先序反序列化
 * @param treeStr 
 */
function preUnserialize (treeStr: string): BinaryTree<number> {
  if (!treeStr) return null;

  let nodes = treeStr.split('_');
  nodes.pop();


  function _unserialize (nodes: string[]): BinaryTree<number> {
    let value = nodes.shift();
    if (value === '#') return null;

    let head = new BinaryTree<number>(parseInt(value));
    head.left = _unserialize(nodes);
    head.right = _unserialize(nodes);

    return head;
  }

  return  _unserialize(nodes);
}


/*******************************************************/

/**
 * 非递归 先序序列化
 * @param root 
 */
function preSerialize2<T> (root: BinaryTree<T>): string {
  if (root === null) return '#_';

  let result = '';
  let stack : BinaryTree<T> [] = [];
  stack.push(root);

  while (stack.length > 0) {
    let current = stack.pop();
    result +=  current.value + '_';

    if (current.right) {
      stack.push(current.right);
    } else {
      result += '#_';
    }

    if (current.left) {
      stack.push(current.left);
    } else {
      result += '#_';
    }
  }

  return result;
}

/**
 * 非递归 先序反序列化
 */

function preUnserialize2 (treeStr: string): BinaryTree<number> {
  if (!treeStr || treeStr == '#_') return null;

  let nodes = treeStr.split('_');
  nodes.pop();

  let arr: BinaryTree<number>[] = [];
  let root = new BinaryTree<number>(parseInt(nodes[0]));
  let currIndex: number = 0;
  let isLeftChild: boolean = true;
  arr.push(root);

  for (let index = 1; index < nodes.length; index++) {
    if (nodes[index] !== '#') {
      let newNode = new BinaryTree<number>(parseInt(nodes[index]));
      if (isLeftChild) {
        arr[currIndex].left = newNode;
      } else {
        arr[currIndex].right = newNode;
      }

      arr.push(newNode);
    }

    if (!isLeftChild) {
      currIndex++;
    }

    isLeftChild = !isLeftChild;
  }

  return root;
}


/*******************************************************/

/**
 * 按照二叉树的层级 从上到下进行序列化
 * @param root 
 */
function preSerialize3<T> (root: BinaryTree<T>): string {
  if (!root) return '#_';

  let queue: BinaryTree<T> [] = [];
  let result = root.value + '_';
  queue.push(root);

  while (queue.length > 0) {
    let currNode = queue.shift();

    if (currNode.left) {
      result += currNode.left.value + '_';
      queue.push(currNode.left);
    } else {
      result += '#_';
    }

    if (currNode.right) {
      result += currNode.right.value + '_';
      queue.push(currNode.right);
    } else {
      result += '#_';
    }
  }

  return result;
}


/**
 * 层级反序列化
 * @param treeStr 
 */
function preUnserialize3 (treeStr: string): BinaryTree<number> {
  if (!treeStr || treeStr == '#_') return null;

  let nodes = treeStr.split('_');
  nodes.pop();

  let currIndex = 0;
  let queue: BinaryTree<number> [] = [];
  let root = _genNode(nodes[currIndex++]);

  if (root) {
    queue.push(root);
  }

  while (queue.length > 0) {
    let currNode = queue.shift();
    currNode.left = _genNode(nodes[currIndex++]);
    currNode.right = _genNode(nodes[currIndex++]);

    if (currNode.left) {
      queue.push(currNode.left);
    }

    if (currNode.right) {
      queue.push(currNode.right);
    }
  }

  function _genNode (valueStr: string): BinaryTree<number> {
    if (valueStr === '#') return null;
    return new BinaryTree<number>(parseInt(valueStr));
  }

  return root;
}

let preOrder = [1, 2, 4, 5, 3, 6, 7];
let inOrder = [4, 2, 5, 1, 6, 3, 7];

let root = buildTree(preOrder, inOrder);
console.log(preSerialize<number>(root));


let newRoot = preUnserialize3(preSerialize3<number>(root));
console.log("反序列化");
printByPreOrder(newRoot);