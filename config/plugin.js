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
    }
};
