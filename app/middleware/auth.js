module.exports = (options, app) => {
    return async (ctx, next) => {
        const { token } = ctx.header;
        if (!token) {
            ctx.body = {
                code: 403,
                status: 1,
                msg: '没有权限'
            }
            return;
        }
        let user = {};
        try {
            user = await ctx.checkToken(token);
        } catch (error) {
            let fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
            ctx.body = {
                code: 403,
                status: 1,
                msg: fail
            }
            return;
        }

        let t = await ctx.app.redis.get('user_' + user.id);
        if (!t || t !== token) {
            ctx.body = {
                code: 400,
                status: 1,
                msg: 'token 不合法'
            }
            return;
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