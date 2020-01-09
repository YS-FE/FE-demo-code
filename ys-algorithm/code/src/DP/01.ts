// let weight: Array<number> = [11, 9, 23, 18, 38, 21, 17, 26, 33, 8];
// let limt: number = 100;
// knapsack(weight, 10, 100); //100


let weight: Array<number> = [2, 2, 4, 6, 3];
let limt: number = 9;
console.log(knapsack(weight, weight.length, limt));

// weight: 物品重量，n: 物品个数，w: 背包可承载重量
function knapsack(weight: Array<number>, n: number, w: number): number {
    let states: boolean[][] = Array(n).fill(Array(w).fill(false));
    states[0][0] = true;  // 第一行的数据要特殊处理，可以利用哨兵优化
    states[0][weight[0]] = true;

    for (let i = 1; i < n; ++i) { // 动态规划状态转移
        for (let j = 0; j <= w; ++j) {// 不把第 i 个物品放入背包
            if (states[i - 1][j] == true) states[i][j] = states[i - 1][j];
        }
        for (let j = 0; j <= w - weight[i]; ++j) {// 把第 i 个物品放入背包
            if (states[i - 1][j] == true) states[i][j + weight[i]] = true;
        }
    }

    console.log(states);

    for (let i = w; i >= 0; --i) { // 输出结果
        if (states[n - 1][i] == true) {
            return i;
        }
    }
    return 0;
}


function knapsack2 (weight: Array<number>, n: number, w: number): number {
    let states: boolean[] = Array(w+1).fill(false);
    states[0] = true;  // 第一行的数据要特殊处理，可以利用哨兵优化
    states[weight[0]] = true;

    for (let i = 1; i < n; ++i) { // 动态规划
        for (let j = w-weight[i]; j >= 0; j--) {// 把第 i 个物品放入背包
            if (states[j]==true) states[j+weight[i]] = true;
        }
    }

    console.log(states);

    for (let i = w; i >= 0; --i) { // 输出结果
        if (states[i] == true) {
            return i;
        }
    }
    return 0;
}


export default {}