
/**
 * 2个整数，只使用 加法 实现 乘法、除法、减法
 * @param a 
 * @param b 
 */

function mul (a: number, b: number): number {
    let result: number = 0;
    for (let i = 0; i < a; i++) {
        result += b;
    }

    return result;
}

function divide (a: number, b: number): number {

    for (let i = 1; i < a; i++) {
        if (mul(b, i) < a  && a < mul(b, i + 1)) {
            return i;
        }
    }

    return 0;
}


function sub (a: number, b: number): number {
    if (a > b) {
        for (let i = 0; i < a; i++) {
            if (b + i == a) {
                return i;
            }
        }
    } else {
        return mul(sub(b, a), -1);
    }
}