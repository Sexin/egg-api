const Subscription = require('egg').Subscription;
const nodemailer = require('nodemailer');

class UpdateCache extends Subscription {

    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '720m', // 
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        // const data = await this.ctx.service.test.getHoneyedWords();
        var user = "1097489781@qq.com";//自己的邮箱
        var pass = "xrcastwzdgwcjfgj"; //qq邮箱授权码,如何获取授权码下面有讲
        var to = '79610451@qq.com';//对方的邮箱
        let transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                user: user, // 用户账号
                pass: pass, //授权码,通过QQ获取
            },
        });
        let info = await transporter.sendMail({
            from: `<${user}>`, // sender address
            to: `<${to}>`, // list of receivers
            subject: `关于学区的一点建议`, // Subject line
            text: `
            区教育局高中和义务教育科：
            本人对萧山中学附属通惠初中学区划分有不同意见，我的建议：把学区划定为南门江以东，晨辉路、南秀路一线以南，商城南路以西，新塘街道与所前交界处以北为宜。
            理由如下：
            1、跟据就近划分原则，南秀路以南、通惠路以东 商城南路以西这一带距通惠路初中更近，而离新桐初中更远，本着就近的原则，理应划分至通惠路初中；
            2、根据萧山快速路建设规划，商城南路将建设成为通城快速路，意味着商城南路取代通惠南路成为南北向主干道路，应成为学区划分的重要标准；
            3、根据规划部门的控规，商城南路以西 南秀路以南这一带与新桐初中不在一个控规单元，而与通惠路初中在一个单元，初中学区划分到一起更合适；
            教育是最大的民生，学区划分关系到我们的切身利益，对于家长来说，孩子就是我们的未来。请教育部门着重考虑上述3点意见，最终确定通惠路初中的学区，万分期待！
            `, // plain text body
        });
    }
}

module.exports = UpdateCache;
