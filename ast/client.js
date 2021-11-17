const axios = require('axios');
const JSONbigNative = require('json-bigint')({ useNativeBigInt: true });
const JSONbig = require('json-bigint');

axios.default.transformResponse  = [function (data) {
  if (typeof data === 'string') {
    try {
      data = JSONbigNative(data, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString()
        }
        return value;
      });
    } catch (err) {

    }
  }
  return data;
}];


axios.default.transformResponse  = [function (data) {
  if (typeof data === 'string') {
    try {
      data = JSONbig(data, (key, value) => {
        if ((typeof value === 'object') && (typeof value.constructor === 'function') && (value.constructor.name === 'BigNumber')) {
          return value.toString();
        }
        return value;
      });
    } catch (err) {

    }
  }
  return data;
}];



// const params = { name: 'lisi'};
// axios.post('http://127.0.0.1:8899/hello',  params, {
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded'
//   }
// } ).then(res => {
//   console.log(res.data);
// });



axios.get('https://yapi.sankuai.com/mock/3631/ad/v2/notice/unread/count', {
  transformResponse: [function (data) {
    console.log("2222", data);
    return data;
  }],
}).then(res => {
})

