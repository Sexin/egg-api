const Subscription = require('egg').Subscription;
const nodemailer = require('nodemailer');

class UpdateCache extends Subscription {

    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '30s', // 时间间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        let useremaillist = await this.ctx.app.redis.get('useemaillist');
        if(useremaillist) {
            useremaillist = JSON.parse(useremaillist);
            const data = await this.ctx.service.test.getDuWords();
            var user = "ceshiemail111222@163.com";
            var pass = 'CGQFQUONUGETDWXY'; 
            let transporter = nodemailer.createTransport({
                host: "smtp.163.com",
                port: 465,
                secure: true,
                auth: {
                    user: user, 
                    pass: pass, 
                },
            });
            Object.keys(useremaillist).map(async item => {
                let info = await transporter.sendMail({
                    from: `来自爸爸的一封邮件<${user}>`, 
                    to: `给儿子<${item}>`, 
                    subject: '惊喜', 
                    text: data, 
                });
                console.log(info)
            })
        }
    }
}

module.exports = UpdateCache;
