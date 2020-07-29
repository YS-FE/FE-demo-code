/**
 * 判断有效括号
 * @param {String} str 
 */

function getValidBrackets (str) {
  if (!str) return false;

  let leftBrackets = "({[";
  let rightBrackets = ")}]";
  let stack = [];

  let arr = str.split('');
  for (let index = 0; index < arr.length; index++) {
     // 左括号
    if (leftBrackets.includes(arr[index])) {
      stack.push(arr[index])
    } else {
      // 右括号
      console.log(rightBrackets.split(''));

      let rithtIndex = (rightBrackets.split('')).findIndex(e => e === arr[index]);
      if (stack.length === 0 || (stack[stack.length - 1] != leftBrackets[rithtIndex])) return false;
      stack.pop();
    }   
  }

  return stack.length > 0 ? false : true;
}

let result = getValidBrackets("((}");
console.log("result = ", result);
