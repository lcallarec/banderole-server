const route = require('koa-route');
const Koa = require('koa');

const start = (banderole, app, port) => {

    app.use(async (ctx, next) => {
        await next();
        ctx.response.set('content-type', 'application/json');
    });

    const decide = (ctx, feature) => {
        ctx.body = JSON.stringify(banderole.isEnabled(feature));
    };

    app.use(route.get('/is-enabled/:feature', decide));
    app.use(route.get('/ping', (ctx) => {
        ctx.body = JSON.stringify('PONG');
    }));

    return app.listen(port);
}

module.exports = start;