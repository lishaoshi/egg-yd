const { Service } = require('egg');
const { bcryptHash } = require('../utils/bcrypt');
class UserService extends Service {
  async insert(userInfo) {
    Object.assign(userInfo, { name: userInfo.userName, password: await bcryptHash(userInfo.password) });
    delete userInfo.userName;
    const result = await this.app.mysql.insert('user', userInfo);
    return result;
  }

  async selectByUserName(name) {
    if (!name) throw new Error('username 不能为空');

    const userInfo = await this.app.mysql.get('user', { name });
    return userInfo;
  }

  async checkUserByPhone(phone) {
    const user = await this.app.mysql.get('user', { phone });
    return user;
  }
}

module.exports = UserService;
