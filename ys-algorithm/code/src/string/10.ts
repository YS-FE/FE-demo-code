

/**
 * @description: 求两个字符串的最长公共子序列
 * @param {type} 
 * @return: 
 * 思路: 通过矩阵对角线求解
 */
function getMaxCommonLen (str1: string, str2: string): string {
    if (!str1 || !str2) {
        return '';
    }

    let help: number[][] = [];
    let maxLen: number = 0;
    let startPos: number = 0;

    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            help[i][j] = 0;
        }
    }
     

    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            if (str1[i] == str2[j]) {
                if (i == 0 || j == 0) {
                    help[i][j] = 1;
                } else {
                    help[i][j] = help[i - 1][j - 1];
                }
                
                if (help[i][j] > maxLen ) {
                    maxLen = help[i][j];
                    startPos = i -maxLen + 1;
                }
            }
        }
    }
    
    return str1.slice(startPos, maxLen + 1);
}