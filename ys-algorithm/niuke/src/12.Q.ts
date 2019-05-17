
let matrix: number[][] = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
];


/**
 * 实现顺时针 转圈打印矩阵
 * @param matrix 
 */
function printMatrix(matrix: number[][]): void {
  let lr = 0, lc = 0;
  let rr = matrix.length - 1;
  let rc = matrix[0].length - 1;

  // 打印一圈之后，调整左上角的点和右下角的坐标
  while (lr <= rr && lc <= rc){
    printEdge(matrix, lr++, lc++, rr--, rc--);
  }
}

/**
 * 打印 边框
 * @param matrix 
 * @param lr  左上角行
 * @param lc  左上角列
 * @param rr  右下角行
 * @param rc  右下角列
 */
function printEdge(matrix: number[][], lr: number, lc: number, rr: number, rc: number): void {
  if (lr === rr) {
    //横向单行
    for (let index = lc; index <= rc; index++) {
      console.log(matrix[lr][index] + ',');
    }
  } else if (lc === rc) {
    //纵向单列
    for (let index = lr; index < rr; index++) {
      console.log(matrix[index][lc]);
    }
  } else {
    //当前的坐标
    let curr = lr, curc = lc;

    //顺时针打印四条边
    //top
    while (curc !== rc) {
      console.log(matrix[curr][curc]);
      curc++;
    }

    //right
    while (curr !== rr) {
      console.log(matrix[curr][curc]);
      curr++;
    }

    //bottom
    while (curc !== lc){
      console.log(matrix[curr][curc]);
      curc--;
    }

    //left
    while (curr !== lr){
      console.log(matrix[curr][curc]);
      curr--;
    }
  }
} 

printMatrix(matrix);

export default {};

