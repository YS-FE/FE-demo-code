/**
 * 一个矩阵中只有0和1两种值，每个位置都可以和自己的上、下、左、右 四个位置相连，
 * 如果有一片1连在一起，这个部分叫做一个岛，求一个 矩阵中有多少个岛?
 */




/**
 * 
 * @param martrix  {矩阵}
 */
function getIslandNumber (martrix: number[][]): number {
  if (!martrix || martrix.length === 1) return 0;
  
  let result = 0;

  for (let i = 0, row = martrix.length; i < row ;i++) {
    for (let j = 0, column = martrix[0].length; j < column ; j++) {
      if (martrix[i][j] === 1) {
        result++;
        findInner(martrix, i, j, row, column);
      }
    }
  }

  return result;
}



/**
 * 进行节点 上下左右的判断
 * @param martrix 
 * @param i 
 * @param j 
 * @param row 
 * @param column 
 */
function findInner (martrix: number[][], i: number, j: number, row: number, column: number) {
  if (i < 0 || i >= row || j < 0 || j >= column || martrix[i][j] !== 1) return;

  martrix[i][j] = 2;
  findInner(martrix, i + 1, j, row, column);
  findInner(martrix, i - 1, j, row, column);
  findInner(martrix, i , j - 1, row, column);
  findInner(martrix, i , j + 1, row, column);
}


let m1 = [ 
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
[ 0, 1, 1, 1, 0, 1, 1, 1, 0 ], 
[ 0, 1, 1, 1, 0, 0, 0, 1, 0 ],
[ 0, 1, 1, 0, 0, 0, 0, 0, 0 ], 
[ 0, 0, 0, 0, 0, 1, 1, 0, 0 ], 
[ 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]];

let m2 = [
  [0,0,1,0,1,0],
  [1,1,1,0,1,0],
  [1,0,0,1,0,0],
  [0,0,0,0,0,0]
];

console.log('岛的数量: ', getIslandNumber(m2));

for (let i = 0; i < m2.length; i++) {
  let str = '';
  for (let j = 0; j < m2[0].length; j++) {
    str += m2[i][j] + ' ';
  }
  console.log(str);
}