let arr : number[] = [];

for (let index = 0; index < 20; index++) {
  // 产生随机数 [0, 100]
  let num = Math.floor(Math.random() * 101);
  arr.push(num);
}

/**
 * 桶排序 时间复杂度O(N)
 * @param arr
 */
function bucketSort(arr : number[]){
  if (!arr || arr.length < 2) return;

  let bucket: number[] = [];
  let start: number = 0;

  bucket = Array(Math.max.apply(null, arr) + 1).fill(0);

  arr.forEach((e, i) => {
    bucket[e] += 1;
  });

  bucket.forEach((e, i) => {
    for (let index = 0; index < e; index++) {
      arr[start++] = i;
    }
  });

}

bucketSort(arr);
console.log("排序之后", arr);



export default {};