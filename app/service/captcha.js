const { Service } = require('egg');

class CaptchaService extends Service {
  async create() {
    const { app } = this;
    return await app.captcha.generate();
  }

  async verifyCaptcha(code) {
    const { ctx } = this;
    console.log(ctx.session.captchaText, code);
    if (ctx.session.captchaText?.toUpperCase() !== code.toUpperCase()) {
      return false;
    }
    return true;
  }
}

module.exports = CaptchaService;

