

/*
我们可以用栈来跟踪可能储水的最长的条形块。使用栈就可以在一次遍历内完成计算。
我们在遍历数组时维护一个栈。如果当前的条形块小于或等于栈顶的条形块，我们将条形块的索引入栈，
意思是当前的条形块被栈中的前一个条形块界定。如果我们发现一个条形块长于栈顶，
我们可以确定栈顶的条形块被当前条形块和栈的前一个条形块界定，因此我们可以弹出栈顶元素并且累加答案到 
*/
var trap = function (arr) {
  if (!arr || (arr.length === 0)) return 0;

  let area = 0;
  let stack = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    
    while (stack.length && (element > arr[stack[stack.length- 1]])) {
      let topIndex = stack.pop();

      if (!stack.length) break;

      let distance = index - stack[stack.length - 1] - 1;
      let tempHeight = Math.min(element, arr[stack[stack.length - 1]]) - arr[topIndex];

      area += distance * tempHeight;
    }

    stack.push(index);
  }

  return area;
}
