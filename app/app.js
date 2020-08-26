module.exports = (app) => {
    // set redis session store
    // session store must have 3 methods
    // define sessionStore in `app.js` so you can access `app.redis`
    app.sessionStore = {
        async get(key) {
            const res = await app.redis.get(key);
            if (!res) return null;
            return JSON.parse(res);
        },

        async set(key, value, maxAge) {
            // maxAge not present means session cookies
            // we can't exactly know the maxAge and just set an appropriate value like one day
            if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
            value = JSON.stringify(value);
            await app.redis.set(key, value, 'PX', maxAge);
        },

        async destroy(key) {
            await app.redis.del(key);
        }
    };

    // session store can be a session store class
    // app.sessionStore = class Store {
    //   constructor(app) {
    //     this.app = app;
    //   }
    //   async get() {}
    //   async set() {}
    //   async destroy() {}
    // };

    // 同步数据库
    if (app.config.env === 'local' || app.config.env === 'unittest') {
        app.beforeStart(async () => {
            await app.model.sync({ force: true });
        });
    }

    // 扩展验证函数
    app.validator.addRule('jsonString', (rule, value) => {
        try {
            JSON.parse(value);
        } catch (err) {
            return 'must be json string';
       
        }
    });
};
