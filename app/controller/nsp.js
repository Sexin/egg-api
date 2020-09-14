// {app_root}/app/io/controller/nsp.js
const Controller = require('egg').Controller;

const PREFIX = 'room';

class NspController extends Controller {
    // 创建房间
    async createroom() {
        const { ctx } = this;
        const { roomname, usernickname } = ctx.request.body;

        const hasRoom = await this.app.redis.get(`${PREFIX}:${roomname}`);
        if(hasRoom) {
            ctx.body = {
                status: 1,
                message: '该房间已存在'
            }
            return;
        }

        await this.app.redis.set(`${PREFIX}:${roomname}`, {name: roomname, master: usernickname});
        ctx.body = {
            status: 0,
            messgae: '创建成功'
        }
    }

    // 加入房间
    async joinroom() {
        const { ctx } = this;
        const { roomname } = ctx.request.body;

        const hasRoom = await this.app.redis.get(`${PREFIX}:${roomname}`);
        if(!hasRoom) {
            ctx.body = {
                status: 1,
                message: '该房间不存在'
            }
            return;
        }
        // 身份判别
        // code……
        ctx.body = {
            status: 0,
            message: '准许加入'
        }
    }
    
}

module.exports = NspController;