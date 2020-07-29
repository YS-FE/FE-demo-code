
/**
 * 每日温度问题, 温度在 30~100之间
 * @param {Array<number>} T 
 */
var dailyTemperatures = function(T) {
  if ((!T) || (!T.length)) return [0];

  let result = [];
  for (let i = 0; i < T.length; i++) {
    let nextIndex;

    for (let j = i + 1; j < T.length; j++) {
      if (T[j] > T[i]) {
        nextIndex = j;
        break;
      }
    }

    if (nextIndex) {
      result[i] = (nextIndex - i);
    } else {
      result[i]  = 0;
    }
  }
  
  return result;
};



var dailyTemperatures2 = function(T) {
  if ((!T) || (!T.length)) return [0];

  let result = [];

  // 维护一个数组，数组下标标识温度
  let next = Array(101).fill(Number.MAX_VALUE);

  for (let i = T.length - 1; i >= 0; i--) {
    let temp = Number.MAX_VALUE;

    // 倒序遍历
    for (let t = T[i] + 1; t <= 100; t++) {
      if (next[t] < temp) {
        temp = next[t];
      }

      if (temp < Number.MAX_VALUE) {
        result[i] = temp - i;
      } else {
        result[i] = 0;
      }
    }
    next[T[i]] = i;
  }

  for (let index = 0; index < result.length; index++) {
    if (!result[index]) result[index] = 0;
  }
  return result;
};


var dailyTemperatures3 = function(T) {
  if ((!T) || (!T.length)) return [0];

  let stack = [];
  let result = [];
  for (let index = 0; index < T.length; index++) {
    const currentEle = T[index];

    while (stack.length) {
      const topEleIndex = stack[stack.length - 1];
      const topEle = T[topEleIndex];

      if (currentEle > topEle) {
        result[topEleIndex] = (index - topEleIndex);
        stack.pop();
      } else {
        break;
      }
    }
    stack.push(index);
  }

  for (let index = 0; index < stack.length; index++) {
    result[stack[index]] = 0;
  }
  return result;
}