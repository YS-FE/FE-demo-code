///// 输出不匹配括号的位置
let getUnmatchJson = function(s) {
  let map = {
      '{': '}',
      '(': ')',
      '[': ']'
  }
  let stack = [], 
      brackets = '{[()]}', 
      result = {}
  for(let i = 0; i < s.length ; i++) {
      // 如果不是括号，跳过
      if(brackets.indexOf(s[i]) === -1) continue
      // 如果是左括号，则进栈
      if(map[s[i]]) {
          stack.push({
              char: s[i],
              index: i
          })
      } else {
          // 如果是右括号，则出栈匹配
          if(!stack.length) {
              //如果栈为 null ，则表示没有匹配的左括号，则当前有括号直接进结果数组
              result[i] = s[i]
              continue
          }
          // 出栈
          let temp = stack.pop()
          // 括号不匹配
          if (s[i] !== map[temp.char]) {
              // 不匹配左括号进结果数组，并i--，继续匹配当前字符
              result[temp.index] = temp.char
              i --
          }
      }
  }
  // 如果匹配结束，依然有剩余的左括号，则直接进结果数组
  while(stack.length) {
      let temp = stack.pop()
      result[temp.index] = temp.char
  }
  return result
};
////////


//////快排
// 快排
function qSort(arr: Array<number>): Array<number> {
  if (arr.length < 2) return arr;
  qSortPart(arr, 0, arr.length - 1);
  return arr;
}


function qSortPart (arr: Array<number>, l: number, r: number):void{
  if (l >= r) return;
  let p = parttion(arr, l, r);
  qSortPart(arr, l, p - 1);
  qSortPart(arr, p + 1, r);
}

function parttion(arr: Array<number>, l: number, r: number): number {
  let p = arr[r];
  let i = l, j = l;

  for (; j <= r - 1; j++) {
      //升序排列
      if (arr[j] < p) {
          swap(arr, i, j);
          i++;
      }
  }
  swap(arr, i , r);
  return i;
}

function swap(arr: Array<number>, src: number, dest: number): void {
  let temp = arr[src];
  arr[src]  = arr[dest];
  arr[dest] = temp;
}


////////