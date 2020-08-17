const test = require('ava');
let obj = {};

test.serial("串行", t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      obj.a = 10;
      t.pass();
      resolve();
    }, 500);
  });
});

test('获取值', t => {
  t.is(obj.a, 10);
});