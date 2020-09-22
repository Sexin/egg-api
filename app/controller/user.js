'use strict';

const Controller = require('egg').Controller;
const { getPassword } = require('../utils/getPassword');
const Op = require('sequelize').Op;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('index.ejs', 456)
    }

    async register() {
        const { ctx } = this;
        let {
            mail, password 
        } = ctx.request.body;

        const user = await ctx.service.user.findOne({
            where: {
                [Op.or]: {
                    username: `${mail}`
                }
            }
        })
        if(user) {
            await ctx.throw(500, '账号已存在');
        }

        password = getPassword(password);        
        await ctx.service.user.create({
            username: mail, password
        })

        ctx.body = {
            status: 'ok',
            msg: '注册成功'
        }
    }

    async login() {
        const { ctx } = this;
        let { username, password} = await ctx.request.body;
        ctx.validate({
            username: 'string',
            password: 'string'
        });
        const user = await ctx.service.user.findOne({
            where: {
                [Op.or]: {
                    username: `${username}`
                }
            }
        })
        if(!user) await ctx.throw(404, '账号不存在');
        if(user.password != getPassword(password)) await ctx.throw(500, '密码错误');
        const token = await ctx.getToken(user.toJSON())
        await ctx.app.redis.set('user_' + username, token);
        let res = {};
        res.status = 'ok';
        res.data = {
            token: token
        }
        ctx.body = res;
    }
}

module.exports = HomeController;
