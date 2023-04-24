const bcrypt = require('bcryptjs');

async function bcryptHash(password) {
  const salt = await bcrypt.genSaltSync(10);
  // 对明文加密
  const paw = await bcrypt.hashSync(password, salt);
  return paw;
}

module.exports = {
  bcryptHash,
};
