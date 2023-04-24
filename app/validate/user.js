class CreateUserRule {
  static regist() {
    return {
      phone: 'string',
      password: 'string',
      imgCode: 'string',
      messageCode: 'string',
    };
  }
  static login() {
    return {
      phone: 'string',
      password: 'string',
    };
  }
}


module.exports = CreateUserRule;
