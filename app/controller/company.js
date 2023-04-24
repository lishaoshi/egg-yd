const { Controller } = require('egg');
const CompanyRule = require('../validate/company');

class ComponyController extends Controller {
  async create() {
    const { ctx } = this;
    await ctx.validate(await CompanyRule.regist(), ctx.request.body);
    const {
      phone,
      componyName,
      imgCode,
      name,
      // code,
      password,
    } = ctx.request.body;
    /**
     * 校验企业是否存在
     */
    const userInfo = await ctx.service.user.checkUserByPhone(phone);
    if (userInfo) {
      ctx.throw(500, '用户已存在！', { data: false });
      return false;
    }
    /**
     * 校验图形验证码是否正确
     */
    if (!await ctx.service.captcha.verifyCaptcha(imgCode)) {
      ctx.throw(500, '图形验证码不正确！');
    }
    try {
      const companyInfo = await ctx.service.company.insert({
        name: componyName,
        phone,
      });
      await ctx.service.user.insert({
        name,
        password,
        phone,
        companyId: companyInfo.id,
      });
    } catch (error) {
      ctx.throw(500, '注册失败！', { data: null });
    }

    await ctx.service.company.insert({
      name: componyName,
      phone,
    });
    ctx.throw(200, '注册成功！', { data: null });


  }
}

module.exports = ComponyController;
