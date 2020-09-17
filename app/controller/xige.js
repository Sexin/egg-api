'use strict';

const Controller = require('egg').Controller;
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

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

    async getlist() {
        const {
            ctx
        }  = this;
        const { page } = ctx.request.body;
        const offset = parseInt(page) - 1;
        const list = await ctx.service.refrigeration.list({ offset: offset * 10, limit: 10 * (offset + 1) });
        ctx.body = list;
    }
}

module.exports = XigeController;
