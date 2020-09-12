module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next();
        if(ctx.status === 404 && !ctx.body) {
            if(ctx.acceptJSON) {
                ctx.body = { error: 'NOT FOUND'};
            } else {
                ctx.body = '<h1>PAGE NOT FOUND</h1>'
            }
        }
    }
}