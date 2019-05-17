import Node from './node';



/**
 * 一颗二叉树，从上往下，从左往右，从1开始，编号
 * 传递2个节点，查找共同祖先节点的编号
 * @description: 
 * @param root 
 * @param a 
 * @param b 
 */
function  findCommonParent(root: Node, a: number, b: number): number {
    if (!root) {
        return null;
    }

    while (a !== b) {
        if (a > b) {
            a /= 2;
        } else {
            b /= 2;
        }
    }

    return a;
}