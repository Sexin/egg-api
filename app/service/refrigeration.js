'use strict';

const Service = require('egg').Service;

class Refrigeration extends Service {
    // 获取
    async list({ offset = 0, limit = 10, where }) {
        const options = {
            offset,
            limit,
            where,
            order: [
                ['id']
            ]
        };
        return await this.ctx.model.Refrigeration.findAndCountAll(options);
    }

    // 存储
    async create(obj) {
        return await this.ctx.model.Refrigeration.create(obj);
    }
}

module.exports = Refrigeration;