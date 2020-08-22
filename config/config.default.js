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
	config.middleware = [];

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

	return {
		...config,
		...userConfig,
		sessionStore,
		redis,
		sequelize,
		security
	};
};
