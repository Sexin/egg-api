module.exports = (options, app) => {
    return async (ctx, next) => {
        const { token } = ctx.header;
        if (!token) {
            ctx.throw('没有权限');
        }
        let user = {};
        try {
            user = await ctx.checkToken(token);
        } catch (error) {
            let fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
            ctx.throw(400, fail);
        }

        let t = await ctx.app.redis.get('user_' + user.username);
        if (!t || t !== token) {
            ctx.throw(400, 'token不合法')
        }
        // 4,判断用户的状态
        // user = await app.model.User.findByPk(user.id);
        // if (!user || user.status == 0) {
        //     ctx.throw(400, '用户不存在或已经被禁用')
        // }

        ctx.authUser = user;
        await next()
    }
}