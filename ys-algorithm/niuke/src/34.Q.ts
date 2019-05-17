/**
 *  数组中的所有字符串连在一起，求字典值最小的组合字符串
 * 比如 ["ba", "b"] , 有2种组合方式 , "bab" < "bba"
 */
function lowestString(strs: string[]): string {
  if (!strs.length) return;

  strs.sort((a, b) => {
    //排序比较器 
    if ((a + b) > (b + a)) {
      return 1;
    } else {
      return -1;
    }
  });

  return strs.join('');
}



function main() {
  let strs: string[] = ["jibw", "ji", "jp", "bw", "jibw" ];
  // let strs: string[] = ["ba", "b"];
  console.log(lowestString(strs));
}

main();

export default {}