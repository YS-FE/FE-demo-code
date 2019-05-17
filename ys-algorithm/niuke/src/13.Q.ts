let matrix: number[][] = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
];


/**
 * 将一个矩阵顺时针旋转90度
 * 不断调整左上角，右下角的坐标进行旋转
 * @param matrix 
 */
function rotateMatrix(matrix: number[][]): void {
  let lr = 0, lc = 0;
  let rr = matrix.length - 1, rc =  matrix[0].length - 1;

  while (lr < rr){
    rotateEdge(matrix, lr++, lc++, rr--, rc--);
  }
}

/**
 * 对边框进行90度顺时针旋转
 * @param matrix 
 * @param lr 
 * @param lc 
 * @param rr 
 * @param rc 
 */
function rotateEdge(matrix: number[][], lr: number, lc: number, rr: number, rc: number): void {
  let times: number = rc - lc;
  let temp: number = 0;

  //一圈需要进行的位置交换
  for(let c = 0; c < times; c++) {
    //四个角交换
    temp = matrix[lr][lc + c];
    matrix[lr][lc + c] = matrix[rr - c][lc];
    matrix[rr - c][lc] = matrix[rr][rc - c];
    matrix[rr][rc - c] = matrix[lr + c][rc];
    matrix[lr + c][rc] = temp;
  }
}


/**
 * 打印矩阵
 * @param matrix 
 */
function printMatrix(matrix: number[][]): void {
  for (let r = 0; r < matrix.length; r++) {
    let str = '[';
    for (let c = 0; c < matrix[r].length; c++) {
      let tempStr = (c === matrix[r].length - 1) ? '': ',';
      str = str + matrix[r][c] + tempStr;
    }
    str = str + ']';
    console.log(str);
  }
}


rotateMatrix(matrix);
printMatrix(matrix);

export default  {};
