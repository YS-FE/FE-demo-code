import { AsyncSeriesWaterfallHook }from 'tapable';

const hooks = new AsyncSeriesWaterfallHook(['test']);

hooks.tapPromise('first', async function (...args){

  console.log('from call', args);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(10);
  //   }, 1000);
  // })

  return 66;
});


hooks.tapPromise('second', async function (...args){
  console.log("from first", args);
  // return 100;
});


hooks.promise(0).then(res => {
  console.log(res);
})