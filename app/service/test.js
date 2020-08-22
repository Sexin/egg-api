'use strict';

const Service = require('egg').Service;

class Test extends Service {

    // 存储
    async create(test) {
        return await this.ctx.model.Test.create(test);
    }
}

module.exports = Test;