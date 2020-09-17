'use strict';

const Service = require('egg').Service;

class Xige extends Service {
    async list(page = 1) {
        const list = await this.ctx.curl('https://bao.hvacr.cn/Tools/DatasHandler.ashx?rnd=0.776306872662071&token=0.41528412759497413&rsformat=json&funsort=getbaoindexdata&type=baike&page=' + page + '&province=%E6%B5%99%E6%B1%9F', {
            method: 'GET',
            dataType: 'json', 
            followRedirect: true
        });
        return list.data;
    }
}

module.exports = Xige;