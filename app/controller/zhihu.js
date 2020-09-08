'use strict';

const Controller = require('egg').Controller;

class ZhihuController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('index.ejs', 456)
    }
    async getlist() {
        const {
            ctx
        }  = this;
        const list = await ctx.service.zhihu.list();
        this.ctx.body = list;
    }

    async getarticlebody() {
        const { ctx } = this;
        // const url = ctx.request.body.url;
        const url = 'http://news-at.zhihu.com/api/2/news/9727562';
        const result = await ctx.service.zhihu.getarticlebody(url);
        this.ctx.body = result;
    }
}

module.exports = ZhihuController;
