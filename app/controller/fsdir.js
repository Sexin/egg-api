'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');

class FsDirController extends Controller {
    async readrootdir() {
        const { ctx } = this;
        const { path } = ctx.request.body;
        let components = [];
        const _path = path.substr(0, 1) == "/" ? path : '/' + path;
        const files = fs.readdirSync(_path);
        files.forEach(function (item, index) {
            components.push(item)
        })
        ctx.body = JSON.stringify(components);
    }
}

module.exports = FsDirController;