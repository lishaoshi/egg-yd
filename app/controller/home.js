'use strict';

const { Controller } = require('egg');


// 定义创建接口的请求参数规则
const createRule = {
  userName: 'string',
};

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg1';
  }
  /*
   * @param
   * 新增一个用户 username
   */
  async createUser() {
    const { ctx } = this;
    const { userName } = ctx.request.body;
    ctx.validate(createRule, ctx.request.body);
    const userInfo = await ctx.service.user.selectByUserName(userName);
    if (userInfo) {
      ctx.throw(500, '用户已存在', { data: '' });
      return false;
    }
    await ctx.service.user.insert({ userName });
    ctx.throw(200, '', { data: null });
  }
}

module.exports = HomeController;
