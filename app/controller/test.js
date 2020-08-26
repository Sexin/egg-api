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
            res.user = ctx.authUser;
        } catch (error) {
            res.status = 1;
            res.message = error;
        }
        ctx.body = res;
    }

    async login() {
        const { ctx }  = this;
        let res = {};
        try {
            const param = {
                id: 1,
                username: 123,
                password: 111
            }
            const token = await ctx.getToken(param)
            await ctx.app.redis.set('user_' + param.id, token);
            res.status = 0;
            res.message = 'ok';
            res.data = {
                token: token
            }
        } catch (error) {
            res.status = 1;
            res.message = error;
        }
        ctx.body = res;
    }
}

module.exports = TestController;
