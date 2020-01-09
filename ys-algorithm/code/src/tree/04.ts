import Node from './node';


/**
 * 搜索二叉树 插入、查找、删除
 */


//插入
function insert (root: Node, data: number): Node {
    if (!root) {
        root = new Node(data);
        return root;
    }

    let p = root;
    while (p) {
        if (data > p.value) {
            if (!p.right) {
                p.right = new Node(data);
                return;
            }
            p = p.right;
        } else if (data < p.value) {
            if (!p.left) {
                p.left = new Node(data);
                return;
            }
            p = p.left;
        }
    };
    return root;
}


//查找节点是否存在
function find (root: Node, data: number): boolean {
    if (!root) return false;

    let p = root;
    while (p) {
        if (p.value === data) return true;

        if (p.value < data) {
            p = p.right;
        } else {
            p = p.left;
        }
    }

    return false;
}


//删除节点
function del (root: Node, data: number) {
    if (!root) return;

    let p = root;
    let pp: Node = null;

    while (p && p.value != data) {
        pp = p;
        if (p.value < data) {
            p = p.right;
        } else {
            p = p.left;
        }
    }

    //节点不存在
    if (!p) return;


    // 左右节点都有时，将右子树中最小的值代替当前节点，再将最小的节点删除即可
    if (p.left && p.right) {
       let pl = p.right;
       while (pl.left && pl.left.left) {
           pl = pl.left;
       }

       p.value = pl.left.value;
       p = pl.left;
       pl.left = null;
       return;
    }


    let child: Node = null;
    //叶子节点
    if ((!p.left) && (!p.right)) {
        child = null;
    }

    //只有一个节点
    if ((!p.left) || (!p.right)) {
        child =  p.left ? p.left : p.right;
    }
    
    //删除根节点
    if (pp == null) {
        root = null;
        return;
    }

    if (pp.left === p) {
        pp.left = child;
    } else  {
        pp.right = child;
    }
    return;
}



//中序遍历  左 根 右,  输出的恰好是 由小到大
function printAsOrder (root: Node) {
    if (!root) return;
    printAsOrder(root.left);
    console.log(root.value);
    printAsOrder(root.right);
}


// 二叉树的层数
function  getLevel (root: Node): number {
    if (!root) return 0;

    let leftLevel = getLevel(root.left);
    let rightLevel = getLevel(root.right);

    return  leftLevel > rightLevel ? (leftLevel + 1) : (rightLevel + 1);
}





// 未考虑 重复的数字, 如果支持重复插入，那么节点的数据类型，可以是arrary link 存储相同的即可
//  也可以将重复的数据当做 大于已经存在的相同节点进行插入，但是查找、删除也要相应的操作
// let arr = [1,2,3,4,5,6,7,8,9,10];
let arr = [6,7,8,9,10,1,2,3,4,5];
let tree = new Node(0);

arr.forEach(e => {
    insert(tree, e);
});

printAsOrder(tree);
del(tree, 3);
printAsOrder(tree);


// console.log(find(tree, 40));
console.log(getLevel(tree))

export default {}