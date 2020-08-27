'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 模板
  router.get('/view/index', controller.home.index);

  // api
  router.post('/api/savetest', controller.test.savetest);
  router.post('/api/gettestlist', controller.test.gettestlist);
  router.post('/api/login', controller.test.login);
};
