import Node from './node';

let path: number[][] = []; //所有路径
let list: number[] = []; //当前路径
let sum: number = 0; //求和

/**
 * 传入一个根节点， 一个数字，得到所有节点(访问到叶子节点为止) 路径和 等于改数字的路径
 * @param root 
 * @param target 
 */
function getPath (root: Node, target: number) {
    if (!root) {
        return path;
    }

    sum += root.value;
    list.push(root.value);

    if (sum === target && !root.left  && !root.right) {
        path.push(list);
    }

    getPath(root.left, target);
    getPath(root.right, target);
    
    sum -= root.value;
    list.pop();
    return path;
}