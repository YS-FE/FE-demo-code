

async function testFn ():Promise<string> {
   let result:string;
   result = await new Promise<string>((resolve, reject)=> {
        setTimeout(() => {
            resolve('ok');
        }, 2000);
    });
    
    return result;
}


async function testFn2 ():Promise<string> {
    let result:string;
    result = await new Promise((resolve: (a:string)=> any, reject)=> {
         setTimeout(() => {
             resolve('ok');
         }, 2000);
     });
     
     return result;
 }


testFn2().then((res:string) => {
    console.log(res);
});
