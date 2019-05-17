/**
 * n 变形，n个顶点，有n只蚂蚁，求蚂蚁相撞的概率 
 * 不相撞的概率 2 * 2^n，同时逆时针或者同时顺时针才不会相撞
 */
function collide (n: number) {
    return 1 - 2 * Math.pow(0.5, n);
}

export default collide;