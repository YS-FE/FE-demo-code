const Tokens = require('csrf');
let tokens = new Tokens();

// let secret = tokens.secretSync();

let token = tokens.create("20170303456789");
console.log('token: ', token);
console.log('verify', tokens.verify("20170303456789", token));


let token1 = tokens.create("20170303456789");
console.log('token1: ', token1);
console.log('verify1', tokens.verify("20170303456789", token1));