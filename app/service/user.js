'use strict';

const Service = require('egg').Service;

class User extends Service {
    async create(obj) {
        return await this.ctx.model.User.create(obj);
    }

    async findOne(where) {
        const user = await this.ctx.model.User.findOne(where);
        return user;
    }
}

module.exports = User;