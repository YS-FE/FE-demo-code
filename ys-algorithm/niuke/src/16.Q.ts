
/**
 * 行列都排好序的矩阵 (从小到大)
 */
let matrix = [
  [1, 3, 4, 7],
  [2, 5, 9, 10],
  [6, 8, 12, 13]
];


/**
 * 矩阵查找是否包含指定的数字, 时间复杂度O(N + M)
 * @param matrix 
 */
function findFromMatrix (matrix: number[][], value: number): boolean {
  if (!matrix || matrix.length < 1) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  // 从右向左查找 
  while (row < matrix.length && col > -1) {
    if (matrix[row][col] === value){
      return true;
    } else if (matrix[row][col] > value){
      col--;
    } else {
      row++;
    }
  }
  return false;
}


console.log(findFromMatrix(matrix, 5));

export default {};
