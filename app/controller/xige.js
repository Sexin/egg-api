'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const Op = require('sequelize').Op;

class XigeController extends Controller {
    async refrigeration() {
        const {
            ctx
        }  = this;
        const { page } = ctx.request.body;
        const list = await ctx.service.xige.list(page);
        let storage = [];
        if(list.ReturnString) {
            const $ = cheerio.load(list.ReturnString);
            var $li = $('li');
            if ($li.length) {
                $li.each(function (index, item) {
                    if($(item).children('.text_ul_img').length == 0) {
                        storage.push({
                            index: index + 1,
                            link: $(item).find('.am-cf .img_box .img').attr('href'),
                            coverimage: $(item).find('.am-cf .img_box .img img').attr('src'),
                            img_mark_link: $(item).find('.am-cf .img_box .img_mark').attr('href'),
                            img_mark_title: $(item).find('.am-cf .img_box .img_mark').text(),
                            title: $(item).find('.intro h3 a').text(),
                            summary: $(item).find('.intro .abstract').text(),
                            origin: $(item).find('.info .user-info .name').text(),
                            time: $(item).find('.info .info-list .time-div .time').attr('pubtime'),
                            tag: $(item).find('.tags-list span a').text(),
                            tag_link: $(item).find('.tags-list span a').attr('href'),
                        });
                    }
                });
            }
        }
        this.ctx.body = storage;
    }

    async listguanghua() {
        const {
            ctx
        }  = this;
        const { page } = ctx.request.body;
        const list = await ctx.service.xige.listguanghua(page);
        let storage = [];
        if(list) {
            const $ = cheerio.load(list);
            var $li = $('.cwp .c_slide .bd #itembd li .hastag a');
            if ($li.length) {
                $li.each(function (index, item) {
                    storage.push({
                        key: index + 1,
                        link: $(item).attr('href'),
                        coverimage: $(item).find('img').attr('src'),
                        title: $(item).find('.titbd .tit h3').text()
                    });
                });

            }
        }
        this.ctx.body = {
            status: 0,
            result: 0,
            data: storage
        };
    }

    async getlist() {
        const {
            ctx
        }  = this;
        const { current, title, pageSize } = ctx.request.body;
        const offset = parseInt(current) - 1;
        let where = {}
        if(title) {
            where.title = {
                [Op.like]: '%' + title + '%'
            };
        }
        const list = await ctx.service.refrigeration.list({ offset: offset * pageSize, limit: pageSize, where });
        ctx.body = {
            current: current,
            data: list.rows,
            pageSize,
            total: list.count,
            success: true
        };
    }
}

module.exports = XigeController;
