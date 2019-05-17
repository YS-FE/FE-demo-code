
/**
 * @description: n * n 矩阵, 旋转90度
 * @param {type} 
 * @return: 
 * 
 * 1  2  3  4
 * 5  6  7  8
 * 9  10 11 12
 * 13 14 15 16
 * 
 */
function rotateMatrix (arr:number[][], n: number): number[][] {

    // 1. 将对角线的元素进行替换
    // 按照 4 7 10 13 对角线，翻转元素
    for (let i = 0; i <  n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            let temp = arr[i][j];
            arr[i][j] = arr[n - 1 -j][n - 1 - i];
            arr[n - 1 -j][n - 1 - i] = temp;
        }
    }

    console.log(arr);

    // 2. 将行进行翻转
    for (let i = 0; i < n / 2; i++) {
        for (let j = 0; j < n; j++) {
            let temp = arr[i][j];
            arr[i][j] = arr[n - 1 - i][j];
            arr[n - 1 - i][j] = temp;
        }
    }

    return arr;
}


let arr: number[][] = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
];

let newArr = rotateMatrix(arr, 4);
console.log(newArr);