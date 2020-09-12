'use strict';

const Controller = require('egg').Controller;

class ZhihuController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('index.ejs', 456)
    }
    // 获取最新的列表
    async getlist() {
        const {
            ctx
        }  = this;
        const list = await ctx.service.zhihu.list();
        this.ctx.body = list;
    }

    // 获取往期信息
    async getbeforelist() {
        const { ctx } = this;
        const { date } = ctx.request.body;
        const list = await ctx.service.zhihu.getbeforelist(date.replace(/-/g, ''))
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
