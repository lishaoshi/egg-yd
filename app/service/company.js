const { Service } = require('egg');
const { v4: uuidv4 } = require('uuid');
const { bcryptHash } = require('../utils/bcrypt');

class ComponyService extends Service {
  async insert(componyData) {
    const { app } = this;
    const componyId = uuidv4();
    await app.mysql.insert('compony', Object.assign(componyData, { id: componyId, password: await bcryptHash(componyData.password) }));
    return {
      componyId,
    };
  }
}

module.exports = ComponyService;

