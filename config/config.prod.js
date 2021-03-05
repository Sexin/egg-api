/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    const config = (exports = {});
    const sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'test',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456'
    };
    config.io = {
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: [],
            }
        },
        redis: {
            host: '127.0.0.1',
            port: 6379,
            auth_pass: '123456'
        },
    };
    return {
        ...config,
        sequelize
    };
};