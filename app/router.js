'use strict';

// const authRouter = require('./routers/auth');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/example', controller.example.index);
  router.post('/api/user', controller.home.createUser);
  router.post('/api/regist', controller.user.regist);
  router.post('/api/login', controller.user.login);
  router.get('/api/getUserInfo', controller.user.getUserInfo);
  router.get('/api/getCaptcha', controller.captcha.create);
  require('./routers/compony.js')(app);
  require('./routers/captcha.js')(app);
};
