/**
 * 输出一个字符串的所有子序列
 * "abc" => "a" "b" "c" "ab" "abc" " " "ac" "bc"
 * 
 */


/**
 * 递归输出
 * @param str 
 * @param index 
 * @param result 
 */
function printSubsequence(str: string, index: number, result: string): void {
    if (str.length == index) {
        console.log("[" + result + "]");
    } else {
        printSubsequence(str, index + 1, result);
        printSubsequence(str, index + 1, result + str[index]);
    }
}

printSubsequence("abc", 0, "");

export default {}