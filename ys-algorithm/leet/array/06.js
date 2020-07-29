/**
 * 给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

输入：s = "3[a2[c]]"
输出："accaccacc"

 * abc3[ab48[ef]xy]st;
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  if (!s) return '';

  let str = s.split('');
  let stack = [];

  for (let index = 0; index < str.length; index++) {
    const element = str[index];
    
    // 入栈，关键判断 ']'
    if (element === ']') {
      let tempStr = [];
      let tempNumStr = [];
      let newStr = '';

      while (stack.length && (stack[stack.length - 1] !== '[')) {
        tempStr.unshift(stack.pop())
      }
      stack.pop();

      while (stack.length && (/\d/.test(stack[stack.length - 1]))) {
        tempNumStr.unshift(stack.pop());
      }

      for (let index = 0; index < Number(tempNumStr.join('')); index++) {
        newStr += tempStr.join('');
      }

      stack.push(newStr);
    } else {
      stack.push(element);
    }
  }

  return stack.join('');
};