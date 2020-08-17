const test = require('ava');

test('test01', (t) => {
  t.is( 3 + 3, 6);
});


test('promise', async t => {
  let fn = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 500);
  });

  t.is(await fn, 1);
});