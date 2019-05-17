
/**
 * 字符串翻转
 * @description: 
 * @param {type} 
 * @return: 
 */
function reverseString (str: string): string {
    if (!str) {
        return '';
    }

    // return str.split('').reverse().join('');

    let temp, strArray = str.split('');
    for (let index = 0; index < strArray.length / 2; index++) {
        temp = strArray[index];
        strArray[index] = strArray[strArray.length - 1 - index];
        strArray[strArray.length - 1 - index] = temp;
    }

    return strArray.join('');
}

console.log(reverseString('abcdefghijklmn'));

export default reverseString;