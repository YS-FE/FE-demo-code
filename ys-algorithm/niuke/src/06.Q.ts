
/**
 * 求排序之后的数组，相邻的最大差值，时间复杂度O(N),不能使用基于非比较排序方法
 * @param arr 
 */
function getMaxGap(arr: number[]): number {
  if (!arr || arr.length < 2) return;

  let len: number = arr.length;
  let min: number = Math.min.apply(null, arr); 
  let max: number = Math.max.apply(null, arr); 

  if (min === max) return 0;

  //准备三个桶, 桶的长度为数组长度+1
  let minBucket: number[] = []; //存放当前位置桶的最小值
  let maxBucket: number[] = []; //存放当前位置桶的最大值
  let statusBucket: boolean[] = []; //当前位置的桶是否为空桶

  minBucket.length = len + 1;
  maxBucket.length = len + 1;
  statusBucket.length = len + 1;

  for (let index = 0; index < len; index++) {
    let bucketIndex = genBucketIndex(arr[index], len, min, max);

    //存放当前位置桶的最小值和最大值
    minBucket[bucketIndex] = statusBucket[bucketIndex] ? Math.min(minBucket[bucketIndex], arr[index]): arr[index];
    maxBucket[bucketIndex] = statusBucket[bucketIndex] ? Math.max(maxBucket[bucketIndex], arr[index]): arr[index];
    statusBucket[bucketIndex] = true;
  }


  let leftMax: number = maxBucket[0];
  let maxGap: number = 0;

  //遍历所有桶，找到当前桶的最小值和上一个桶的最大差值
  for(let i = 1; i < len + 1; i++){
    if (statusBucket[i]) {
      maxGap = Math.max(maxGap, minBucket[i] - leftMax);
      leftMax = maxBucket[i];
    }
  }

  return maxGap;
}

/**
 * 确定要存放的桶的索引
 * @param num {当前数字} 
 * @param len {原数组的长度}
 * @param min {原数组的最小值}
 * @param max {原数组的最大值}
 */
function genBucketIndex(num: number, len: number, min: number, max: number): number {
  return Math.floor((num - min) * len / (max - min));
}


console.log("最大差值为", getMaxGap([3,16,10,20,7,9])); //6

export default {};