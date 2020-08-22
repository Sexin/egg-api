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
        
        const { name, desc, fullname} = ctx.request.body;
        const test = await ctx.service.test.create({
            name, desc, fullname
        })
        try {
            res.status = 0;
            res.message = 'ok';
            res.body = test;
        } catch (error) {
            res.status = 1;
            res.message = error;
        }

        ctx.body = res;
    }
}

module.exports = TestController;
