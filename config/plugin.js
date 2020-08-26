'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    session: {
        enable: true
    },
    sequelize: {
        package: 'egg-sequelize'
    },
    jwt: {
        enable: true,
        package: 'egg-jwt'
    },
    sessionRedis: {
        enable: true,
        package: "egg-session-redis"
    },
    ejs: {
        enable: true,
        package: 'egg-view-ejs'
    },
    io: {
        enable: true,
        package: 'egg-socket.io',
    }
};
