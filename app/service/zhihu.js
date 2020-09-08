'use strict';

const Service = require('egg').Service;

class Zhihu extends Service {
    async list() {
        const list = await this.ctx.curl('https://news-at.zhihu.com/api/4/news/before/20200910', {
            method: 'GET',
            followRedirect: true
        });
        return JSON.parse(list.data.toString());
    }

    async getarticlebody(url) {
        const body = await this.ctx.curl(url, {
            method: 'GET',
            followRedirect: true
        });
        return JSON.parse(body.data.toString());
    }
}

module.exports = Zhihu;