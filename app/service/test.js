'use strict';

const Service = require('egg').Service;

class Test extends Service {
    // 获取
    async list({ offset = 0, limit = 10, where }) {
        const options = {
            offset,
            limit,
            where,
            order: [
                ['created_at', 'desc'],
                ['id', 'desc']
            ]
        };
        return await this.ctx.model.Test.findAndCountAll(options);
    }

    // 存储
    async create(test) {
        return await this.ctx.model.Test.create(test);
    }
}

module.exports = Test;