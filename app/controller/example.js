
const { Controller } = require('egg');

class Example extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'egg example';
  }
}

module.exports = Example;
