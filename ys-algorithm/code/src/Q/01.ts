let maxW: number  = 0; // 存储背包中物品总重量的最大值

// cw 表示当前已经装进去的物品的重量和；i 表示考察到哪个物品了；
// w 背包重量；items 表示每个物品的重量；n 表示物品个数
// 假设背包可承受重量 100，物品个数 10，物品重量存储在数组 a 中，那可以这样调用函数：

let a: Array<number> = [11,9,23,18,38,21,17,26,33,8];
getMax(0, 0, a, 10, 100);
console.log("maxW = ", maxW);

function getMax(i: number, cw: number,  items: Array<number>, n: number, w: number) {
  if (cw == w || i == n) { // cw==w 表示装满了 ;i==n 表示已经考察完所有的物品
    if (cw > maxW) maxW = cw;
    return;
  }
  getMax(i+1, cw, items, n, w);

  if (cw + items[i] <= w) {// 已经超过可以背包承受的重量的时候，就不要再装了
    getMax(i+1,cw + items[i], items, n, w);
  }
}


export default {}