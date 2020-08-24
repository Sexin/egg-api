'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async savetest() {
        const { ctx } = this;
        let res = {};
        
        try {
            const { name, desc, fullname} = ctx.request.body;
            const test = await ctx.service.test.create({
                name, desc, fullname
            })
            res.status = 0;
            res.message = 'ok';
            // res.body = test;
        } catch (error) {
            res.status = 1;
            res.message = error;
        }

        ctx.body = res;
    }

    async gettestlist() {
        const { ctx } = this;
        let res = {};
        try {
            let { offset, limit} = ctx.request.body;
            offset = parseInt(offset);
            limit = parseInt(limit);
            const test = await ctx.service.test.list({
                offset, limit
            })
            res.status = 0;
            res.message = 'ok';
            res.body = test;
            res.num = this.ctx.session.num;
        } catch (error) {
            res.status = 1;
            res.message = error;
        }
        ctx.body = res;
    }
}

module.exports = TestController;
