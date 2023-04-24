const { Controller } = require('egg');

class CaptchaController extends Controller {
  async create() {
    const { ctx } = this;
    // const captcha = await ctx.service.captcha.generate();
    const captcha = await ctx.service.captcha.create();
    ctx.response.type = 'svg';
    this.setCodeInSession(captcha.text);
    ctx.body = captcha.data;
  }
  async validate() {
    const { ctx } = this;
    const { imgCode } = ctx.request.body;
    const flag = await ctx.service.captcha.verifyCaptcha(imgCode);
    if (!flag) {
      ctx.throw(200, '验证码不正确');
    }
    ctx.throw(200, '验证码正确');
  }
  async setCodeInSession(code) {
    const { ctx } = this;
    ctx.session.captchaText = code;
  }
}

module.exports = CaptchaController;
