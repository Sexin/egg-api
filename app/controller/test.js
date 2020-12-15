'use strict';

const Controller = require('egg').Controller;
const VerifyPassword = require('../utils/verifypassword');
const nodemailer = require("nodemailer");

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
            await ctx.app.redis.set('user_' + param.username, token);
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

    async gethoneyedwords() {
        const { ctx } = this;
        const { url } = ctx.request.body;
        const data = await ctx.service.test.getHoneyedWords();
        const test = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!test.exec(url)) {
            ctx.throw('邮箱格式不正确');
        }
        var user = "1097489781@qq.com";//自己的邮箱
        var pass = "lrkkoxueyexziijj"; //qq邮箱授权码,如何获取授权码下面有讲
        var to = url;//对方的邮箱
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 587,
            secure: false,
            auth: {
                user: user, // 用户账号
                pass: pass, //授权码,通过QQ获取
            },
        });
        let info = await transporter.sendMail({
            from: `肉肉<${user}>`, // sender address
            to: `宝宝<${to}>`, // list of receivers
            subject: '一天一句爱你情话', // Subject line
            text: data, // plain text body
        });
        console.log("发送成功");
        ctx.body = {
            status: 0,
            msg: '发送成功'
        };
    }

    async setuseremaillist() {
        const { ctx } = this;
        const { email, type = 1 } = await ctx.request.body;
        const test = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!test.exec(email)) {
            ctx.throw('邮箱格式不正确');
        }
        if(type) {
            const adminemail = ['1097489781@qq.com']
            if(adminemail.indexOf(email) > -1) {
                ctx.throw('管理员账号不可添加');
            } 
        }
        let useremaillist = await ctx.app.redis.get('useemaillist');
        if(!useremaillist) {
            useremaillist = {};
        } else {
            useremaillist = JSON.parse(useremaillist);
        }
        if(type) {
            useremaillist[email] = email;
        } else {
            delete useremaillist[email];
        }
        await ctx.app.redis.set('useemaillist', JSON.stringify(useremaillist));
        ctx.body = {
            status: 0,
            msg: useremaillist,
            email: email
        }
    }

    async getuseremaillist() {
        const { ctx } = this;
        let useremaillist = await ctx.app.redis.get('useemaillist');
        let arr = [];
        if(useremaillist) {
            arr = Object.keys(JSON.parse(useremaillist)).map(item => {
                return {
                    email: item
                }
            })
        } else {
            arr = [];
        }
        ctx.body = {
            status: 0,
            msg: '查询成功',
            data: arr
        }
    }

}

module.exports = TestController;
