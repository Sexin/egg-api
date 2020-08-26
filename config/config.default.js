/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1598064720774_9577';

	// add your middleware config here
    config.middleware = ['auth', 'errorHandler'];
    config.auth = {
        ignore: ['/login']
    }

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	const sessionStore = {
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
	const redis = {
		client: {
			port: 6379, // Redis port
			host: '127.0.0.1', // Redis host
			password: 'auth',
			db: 0
		}
	};
	const sequelize = {
		//
		dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
		database: 'test_dev',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '123456',
		timezone: '+08:00'
		// delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
		// baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
		// exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
		// more sequelize options
	};
	const security = {
		xframe: {
			enable: false
		},
		csrf: {
			enable: false
		}
	};

	const onerror = {
		all(err, ctx) {
		  // 在此处定义针对所有响应类型的错误处理方法
		  // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
		  ctx.body = 'error';
		  ctx.status = 500;
		},
		html(err, ctx) {
		  // html hander
		  ctx.body = '<h3>error</h3>';
		  ctx.status = 500;
		},
		json(err, ctx) {
		  // json hander
		  ctx.body = { message: 'error' };
		  ctx.status = 500;
		},
		jsonp(err, ctx) {
		  // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
		},
    };
    
    const jwt = {
        secret: '123456'
    }

	return {
		...config,
		...userConfig,
        sessionStore,
		redis,
		sequelize,
		security,
        onerror,
        jwt
	};
};
