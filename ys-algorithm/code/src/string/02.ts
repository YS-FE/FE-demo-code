

/**
 * 变形词：字符种类一致，每个字符出现的次数也一样
 * 都为普通字符，编码 0~255之间
 * @description: 比较2个字符串是否是互为变形词  O(N)
 * @param {type} 
 * @return: 
 */
function deformationWord (str1: string, str2: string): boolean {
    if (!str1 || !str2 || (str1.length !== str2.length)) {
        return false;
    }

    let book: Array<number> = (new Array(256)).fill(0);

    //统计每个字符的次数
    for (let index = 0; index < str1.length; index++) {
        book[str1.charCodeAt(index)]++;
    }

    //将之前统计的每个字符的次数进行递减，如果为负值肯定就不是变形词
    for (let index = 0; index < str2.length; index++) {
        if (book[str2.charCodeAt(index)]-- === 0) {
            return false;
        }
    }

    return true;
}


function test(str1: string, str2: string): void {
    console.log(deformationWord(str1, str2));
}

test("abbbbcdefg", "gfebbbdcba");

export default  deformationWord;