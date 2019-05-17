/**
 * '之' 字打印矩阵`
 */

let matrix: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10,11,12],
  [13,14,15,16],
];

/**
 * 控制起点进行打印
 * @param matrix 
 */
function printSpecial (matrix: number[][]): void {
  let lr = 0, lc = 0;
  let rr = 0, rc = 0;
  let direction = true;

  while (1){
    printDiagonalLine(matrix, lr, lc, rr, rc, direction);
    direction = !direction;

    if (lr && lr === rr && lc === rc)  break;

    //右上角 向右移动，移动到最右边时，向下移动
    rc++;
    if (rc === matrix[0].length){
      rc = matrix[0].length - 1;
      rr += 1;
    }


    //左下角 向下移动，移动到最下边时，向右移动
    lr++;
    if (lr === matrix.length) {
      lr = matrix.length - 1;
      lc += 1;
    }
  }
}



/**
 * 打印矩阵的一条对角线
 * @param matrix 
 * @param lr 
 * @param lc 
 * @param rr 
 * @param rc 
 * @param clockwise {是否顺时针打印}
 */
function printDiagonalLine (matrix: number[][], lr: number, lc: number, rr: number, rc: number, clockwise: boolean): void {
  let str = '';

  if (clockwise){
    //右上到左下 打印
    while (1){
      if (lr === rr && lc === rc){
        str = str + matrix[rr][rc] + ' ';
        break;
      }
      str = str + matrix[rr++][rc--] + ' ';
    }

  } else {
    //左下到右上 打印
    while (1){
      if (lr === rr && lc === rc){
        str = str + matrix[lr][lc] + ' ';
        break;
      }
      str = str + matrix[lr--][lc++] + ' ';
    }
  }

  console.log(str);
}


printSpecial(matrix);
export default {};