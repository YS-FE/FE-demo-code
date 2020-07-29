


/**
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
  求在该柱状图中，能够勾勒出来的矩形的最大面积


  单调栈，求出每一个柱子 左、右边界
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  if ((!heights) || (heights.length === 0)) return 0; 

  let stack = [], left = [], right = (new Array(heights.length)).fill(heights.length), max = 0;
  
  for (let index = 0; index < heights.length; index++) {
    
    while (stack.length && (heights[index] <= (heights[stack[stack.length - 1]]))) {
      right[stack[stack.length - 1]] = index;
      stack.pop();
    }

    left[index] = stack.length ? stack[stack.length - 1] : -1;
    stack.push(index);
  }

  for (let j = 0; j < heights.length; j++) {
    max = Math.max(max, (right[j] - left[j] -1) * heights[j])
  }

  return max;
};