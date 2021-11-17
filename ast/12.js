const JSONBig = require('json-bigint');
const JSONbigNative = require('json-bigint')({ useNativeBigInt: true });

const a = `
{
  "code": 0,
  "msg": "ok",
  "data": {
    "hobby": ["read"],
    "count": 716278893360090310
  }
}
`;


// console.log(JSON.parse(a));
// console.log(JSONBig.parse(a).data.count.toString());
// console.log(JSONBig.parse(a));

// const result = JSONbigNative.parse(a, (key, value) => {
//   if (typeof value === 'bigint') {
//     return value.toString();
//   }
//   return value;
// });

// console.log(result);



const result2 = JSONBig.parse(a, (key, value) => {
  if ((typeof value === 'object') && (typeof value.constructor === 'function') && (value.constructor.name === 'BigNumber')) {
    return value.toString();
  }
  return value;
});

console.log(result2);