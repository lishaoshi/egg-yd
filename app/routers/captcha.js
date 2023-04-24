module.exports = app => {
  const { router, controller } = app;
  router.post('/api/captcha/validate', controller.captcha.validate);
};
