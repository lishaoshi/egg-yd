module.exports = app => {
  const { router, controller } = app;
  router.post('/api/compony/create', controller.company.create);
};
