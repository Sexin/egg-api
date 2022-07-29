const Subscription = require('egg').Subscription;
const nodemailer = require('nodemailer');

class UpdateCache extends Subscription {

    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
	    disable: true,
            interval: '60m', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const data = await this.ctx.service.test.getHoneyedWords();
        var user = "ceshiemail111222@163.com";//自己的邮箱
        var pass = "CGQFQUONUGETDWXY"; //qq邮箱授权码,如何获取授权码下面有讲
        var to = '369959405@qq.com';//对方的邮箱
        let transporter = nodemailer.createTransport({
            host: "smtp.163.com",
            port: 465,
            secure: true,
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
    }
}

module.exports = UpdateCache;
