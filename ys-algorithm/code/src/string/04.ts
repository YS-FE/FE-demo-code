

/**
 * 旋转词: 一个字符串中，将前面任意数量的字符 挪动到末尾，生成的字符串为旋转词
 * @description: 两个字符串是否为旋转词
 * @param {type} 
 * @return: 
 */
function rotationWord (str1: string, str2: string): boolean {
    if (!str1 || !str2 || (str1.length !== str2.length)) {
        return false;
    }

    //生成一个两倍长的字符串
    let newStr = str2 + str2;

    //如果两倍长的字符串中包含另一个字符串，那么就互为旋转词
    if (newStr.includes(str1)) {
        return true;
    }
    return false;
}