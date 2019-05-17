
/**
 * "aaabbbccddef"
 * @description: 压缩字符串 "a3b3c2d2ef",如果压缩的字符串比原字符串长，
 * 那么返回原字符串
 * @param {type} 
 * @return: 
 */
function statistics (str: string): string {
    if (!str) {
        return '';
    }

    let result: string = '';
    let count: number = 1;//计数从1开始

    for (let index = 0; index < str.length; index++) {
        if (str[index] === str[index + 1]) {
            count++;
        } else {
            result += str[index] + count;
            count = 1;
        }
    }

    result = result.length > str.length ? str : result;

    return result;
}


function test (str: string):void {
    console.log(statistics(str))
}

test("aaabbbccddeffff");

export default statistics;