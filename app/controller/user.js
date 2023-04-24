const { Controller } = require('egg');
const CreateUserRule = require('../validate/user');
const bcrypt = require('bcryptjs');
class UserController extends Controller {
  /**
   * 注册
   */
  async regist() {
    const { ctx } = this;
    await ctx.validate(await CreateUserRule.regist(), ctx.request.body);
    const {
      userName: name,
      password,
      phone,
      imgCode,
    } = ctx.request.body;
    /**
     * 校验图形验证码是否正确
     */
    if (!await ctx.service.captcha.verifyCaptcha(imgCode)) {
      ctx.throw(500, '图形验证码不正确！');
    }
    const userInfo = await ctx.service.user.checkUserByPhone(phone);
    if (userInfo) {
      ctx.throw(500, '用户已存在！', { data: false });
      return false;
    }
    await ctx.service.user.insert({
      name,
      password,
      phone,
    });
    ctx.throw(200, '注册成功！', { data: null });
  }
  /**
   * 登录 生成token
   */
  async login() {
    const { ctx } = this;
    await ctx.validate(await CreateUserRule.login(), ctx.request.body);
    const { phone, password } = ctx.request.body;
    const userInfo = await ctx.service.user.checkUserByPhone(phone);
    if (!userInfo) {
      ctx.throw(500, '用户不存在！', { data: false });
      return false;
    }

    // 校验密码是否一致
    const flag = await bcrypt.compareSync(password, userInfo.password);
    if (!flag) {
      ctx.throw(500, '密码不正确！', { data: false });
      return false;
    }
    // const { jwt: { secret, expiresIn } } = this.app.config;
    const token = await this.app.jwt.sign({
      id: userInfo.id,
    });
    ctx.throw(200, '登录成功', { data: token });
  }

  async getUserInfo() {
    const { ctx } = this;
    ctx.throw(200, '', { data: ctx.state.user });
  }
}

module.exports = UserController;
