'use strict';

const Controller = require('egg').Controller;
const VerifyPassword = require('../utils/verifypassword');

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
        let { offset, limit} = ctx.request.body;
        ctx.validate({
            offset: 'number',
            limit: {
                type: 'number',
                required: true
            }
        });
        offset = parseInt(offset);
        // limit = parseInt(limit);
        const test = await ctx.service.test.list({
            offset
        })
        const vp = new VerifyPassword('admin', '123456');
        const result = vp.checkpassword('123456');
        res.result = result;
        res.status = 0;
        res.message = 'ok';
        res.body = test;
        res.user = ctx.authUser;
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

    async querylist() {
        const { ctx } = this;
        let res = {};
        let { offset, limit} = ctx.request.body;
        ctx.validate({
            offset: 'number',
            limit: {
                type: 'number',
                required: true
            }
        });
        offset = parseInt(offset);
        // limit = parseInt(limit);
        const test = await ctx.service.test.queryList({
            offset
        })
        const vp = new VerifyPassword('admin', '123456');
        const result = vp.checkpassword('123456');
        res.result = result;
        res.status = 0;
        res.message = 'ok';
        res.body = test;
        res.user = ctx.authUser;
        ctx.body = res;
    }
}

module.exports = TestController;
