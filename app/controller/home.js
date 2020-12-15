'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('index.ejs', 456)
    }

    async zhihuindex() {
        const { ctx } = this;
        await ctx.render('zhihuindex.ejs', 456)
    }

    async xige() {
        const { ctx } = this;
        await ctx.render('xige.ejs', 456)
    }

    async email() {
        const { ctx } = this;
        await ctx.render('email.ejs', 456)
    }
}

module.exports = HomeController;
