/**
 * 二叉树
 */

export class BinaryTree<T> {
  public value: T;
  public left: BinaryTree<T>;
  public right: BinaryTree<T>;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * 根据先序遍历和中序遍历 生成一颗二叉树
 * @param preOrder {先序}
 * @param inOrder  {中序}
 */
export function buildTree (preOrder: number[], inOrder: number[]): BinaryTree<number> {
  if (preOrder.length < 1 || inOrder.length < 1) return null;

  let  root = null;

  // 中序遍历的顺序
  let inOrderMap = new Map();
  for (let index = 0; index < inOrder.length; index++) {
    inOrderMap.set(inOrder[index], index);
  }

  root = new BinaryTree<number>(preOrder[0]);

  //遍历先序
  for (let index = 1; index < preOrder.length; index++) {
    let current = root;
    while (true) {
      //为根节点的左孩子或者左子树
      if (inOrderMap.get(preOrder[index]) < inOrderMap.get(current.value)) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new BinaryTree<number>(preOrder[index]);
          break;
        }
      } else {
        //为根节点的右孩子或者右子树
        if (current.right) {
          current = current.right;
        } else {
          current.right = new BinaryTree<number>(preOrder[index]);
          break;
        }
      }
    }
  }

  return root;
}


/**
 * 树先序遍历
 * @param root 
 */
export function printByPreOrder<T> (root: BinaryTree<T>): void {
  if (root == null) return null;

  console.log(root.value);
  printByPreOrder(root.left);
  printByPreOrder(root.right);
}

// 非递归先序
export function printByPreOrder2<T> (root: BinaryTree<T>): void {
  if (root == null) return;
  let stack: BinaryTree<T>[] = [];

  stack.push(root);
  while (stack.length > 0) {
    let current = stack.pop();
    console.log(current.value);

    if (current.right) {
      stack.push(current.right);
    }

    if (current.left) {
      stack.push(current.left);
    }
  }
}


// 非递归中序
export function printByInOrder2<T> (root: BinaryTree<T>): void {
  if (root == null) return;
  let stack: BinaryTree<T>[] = [];

  while (root || (stack.length > 0)) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      let current = stack.pop();
      current = current.right;
    }
  }
}

/**
 * 非递归 后序遍历
 * @param root 
 */
export function printByPostOrder2<T> (root: BinaryTree<T>): void {
  if (root == null) return;

  let stack: BinaryTree<T>[] = [];
  let result: BinaryTree<T>[] = []; //保存的是 根右左 的顺序 


  //对先序遍历做简单修改
  stack.push(root);
  while (stack.length > 0) {
    let current = stack.pop();
    result.push(current);

    if (current.left) {
      stack.push(current.left);
    } 

    if (current.right) {
      stack.push(current.right);
    }
  }


  //将根右左的顺序 逆序打印就是 左右根的 后序了
  while (result.length > 0) {
    console.log(result.pop().value);
  }
}



/**
 * 树中序遍历
 * @param root 
 */
export function printByInOrder<T> (root: BinaryTree<T>): void {
  if (root == null) return null;

  printByInOrder(root.left);
  console.log(root.value);
  printByInOrder(root.right);
}


/**
 * 树后序遍历
 * @param root 
 */
export function printByPostOrder<T> (root: BinaryTree<T>): void {
  if (root == null) return null;

  printByPostOrder(root.left);
  printByPostOrder(root.right);
  console.log(root.value);
}


// let preOrder = [1, 2, 4, 5, 3, 6, 7];
// let inOrder = [4, 2, 5, 1, 6, 3, 7];

// let root = buildTree(preOrder, inOrder);

// console.log("先序:");
// printByPreOrder<number>(root);

// console.log("中序:");
// printByInOrder<number>(root);

// console.log("后序:");
// printByPostOrder<number>(root);
// printByPostOrder2<number>(root);




