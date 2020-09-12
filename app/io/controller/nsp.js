// {app_root}/app/io/controller/nsp.js
const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload, usernickname } = message;
      console.log('++++++++')
      console.log(target, payload, usernickname);
      console.log('++++++++')
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target, usernickname });
      nsp.emit(target, msg);
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;