/**
 * 汉诺塔问题, n个数按照顺序从左移动右的步骤
 * left(起始)  help(中间过渡)  right(结束)
 * 2^n - 1
 */


function hanno(n: number, from: string, to: string, help: string) {
    if (n == 1) {
        console.log(`move ${n} from ${from} to ${to}`);
        return;
    } else {
        hanno(n-1, from , help, to);
        console.log(`move ${n} from ${from} to ${to}`);
        hanno(n-1, help, to, from);
    }
}

hanno(3, 'left', 'right', 'middle');


export default {}