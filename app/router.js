'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);

  router.post('/savetest', controller.test.savetest);
  router.post('/gettestlist', controller.test.gettestlist);
  router.post('/login', controller.test.login);
};