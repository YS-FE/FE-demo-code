import Node from './node';

/**
 * @description: 二叉树是否为搜索二叉树
 * @param {type} 
 * @return: 
 */
function isBST(root: Node): boolean {
    if (!root) {
        return true;
    }

    return isBSTUtil(root, Number.MIN_VALUE, Number.MAX_VALUE);
}

function isBSTUtil(root: Node, min: number, max: number): boolean {
    if (!root) {
        return true;
    }

    if (root.value < min || root.value > max) {
        return false;
    }

    return isBSTUtil(root.left, min, root.value - 1) && 
    isBSTUtil(root.right,  root.value + 1, max);
}

export default isBST;