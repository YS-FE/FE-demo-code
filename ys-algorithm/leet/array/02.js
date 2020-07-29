
/**
 * 删除有效括号的外层括号
 * 
 * @param {*} str 
 */
function removeOuterParentheses (str) {
  let result = [], s = [];

  str.split('').forEach(e => {
    if (e === '(') {
      s.push('(');
      if (s.length > 1) {
        result.push('(');
      }
    } else {
      if (s.length > 1) {
        result.push(')');
      }
      s.pop();
    }
  });

  return result.join('');
}