import * as Koa from 'koa';
import { Controller, Get, Post, Patch } from './decorator';
import BaseController from './BaseController';


@Controller('/user')
class UserController extends BaseController {

  @Get('/list')
  getUserList(ctx: Koa.BaseContext, next: Koa.Next) {
    ctx.body = 'getUserList';
  }

  @Post('/name')
  setUserName(ctx: Koa.BaseContext, next: Koa.Next) {
    ctx.body = {
      code: 200,
      data: null,
      msg: ''
    };
  }

  @Patch('/age')
  setUserAge(ctx: Koa.BaseContext, next: Koa.Next) {
    ctx.body = {
      code: 200,
      data: null,
      msg: ''
    };
  }
}

export default UserController;
