import * as Koa from 'koa';
import * as Router from 'koa-router';
import 'reflect-metadata';
import BaseController from './BaseController';
import UserController from './UserController';


const app = new Koa();
const router = new Router();

app.use(async (ctx: Koa.BaseContext, next: Koa.Next) => {
  console.log('middleware...');
  await next();
});


/**************************应该通过load去自动加载、实例化 Controller ************************************* */

function mapRoute<T> (instance: T , rootPath: string): any[] {
  let propertype = Object.getPrototypeOf(instance);
  let names = Object.getOwnPropertyNames(propertype);

  let methodsNames = names.filter(item => (item !== 'constructor') && (typeof propertype[item] === 'function' ));

  return methodsNames.map(methodName => {
    const fn = propertype[methodName];
    const path = Reflect.getMetadata('path', fn);
    const httpMethod = Reflect.getMetadata('httpMethod', fn);

    if (!httpMethod) return;

    return {
      route: rootPath + path,
      httpMethod,
      fn,
      methodName
    }
  }).filter(item => {
    if (item) return true;
  });
}

let rootPath = Reflect.getMetadata('path', UserController);
let routes = mapRoute<UserController>( new UserController(), rootPath);

for (let index = 0; index < routes.length; index++) {
  const currentRoute  = routes[index];
  ((router as any)[currentRoute.httpMethod])(currentRoute.route, (ctx: Koa.BaseContext, next: Koa.Next) => {
    currentRoute.fn.call(this, ctx, next);
  });
}

/*************************************************************** */


app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8080, () => {
  console.log('listening  8080')
});