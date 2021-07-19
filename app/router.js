'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, io, view } = app;
    // 模板
    router.get('/view/index', controller.home.index);
    router.get('/view/zhihuindex', controller.home.zhihuindex);
    router.get('/view/xige', controller.home.xige);
    router.get('/view/email', controller.home.email);
    router.get('/view/huiyong', controller.home.huiyong);

    // api
    router.post('/api/savetest', controller.test.savetest);
    router.post('/api/gettestlist', controller.test.gettestlist);
    router.post('/api/querylist', controller.test.querylist);
    router.post('/api/login', controller.test.login);
    router.post('/api/gethoneyedwords', controller.test.gethoneyedwords);
    router.post('/api/setuseremaillist', controller.test.setuseremaillist);
    router.post('/api/getuseremaillist', controller.test.getuseremaillist);
    router.post('/api/getfile', controller.test.getfile);
    router.post('/api/huiyong', controller.test.huiyong);
    
    //知乎
    router.post('/api/zhihu/getlist', controller.zhihu.getlist);
    router.post('/api/zhihu/getarticlebody', controller.zhihu.getarticlebody);
    router.post('/api/zhihu/getbeforelist', controller.zhihu.getbeforelist);

    // 爬虫
    router.post('/api/spider', controller.spider.spider);
    router.post('/api/spiderguanghua', controller.xige.listguanghua);

    // 创建房间
    router.post('/api/nsp/createroom', controller.nsp.createroom);
    router.post('/api/nsp/joinroom', controller.nsp.joinroom);
    // io
    io.of('/').route('exchange', io.controller.nsp.exchange);


    // 西哥 api
    router.post('/api/xige/refrigeration', controller.xige.refrigeration);
    router.post('/api/xige/getlist', controller.xige.getlist);


    // 注册
    router.post('/api/user/register', controller.user.register);
    router.post('/api/user/login', controller.user.login);

    // 文件管理
    router.post('/api/fsdir/readrootdir', controller.fsdir.readrootdir);

};
