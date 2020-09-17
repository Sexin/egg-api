'use strict';

const Service = require('egg').Service;
const puppeteer = require('puppeteer');

class SpiderService extends Service {

    async list({ offset = 0, limit = 10, where }) {
        const options = {
            offset,
            limit,
            where,
            order: [
                ['created_at', 'desc'],
                ['id', 'desc']
            ]
        };
        return await this.ctx.model.Test.findAndCountAll(options);
    }

    async initPage() {
        return 'hi unstorm-spider.';
    }

    async spiderpage() {
        const browser = await puppeteer.launch({
            headless: true, // 使用无头浏览器抓取
        });

        const page = await browser.newPage();

        // 设置客户端
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');

        await page.goto('https://bao.hvacr.cn/', {
            waitUntil: ['domcontentloaded']
        });

        await page.screenshot({ path: 'static.png' });
        const data = await page.evaluate(() => {
            var storage = [];
            // 单页爬取
            var $li = $('#baike_container li');
            if ($li.length) {
                $li.each(function (index, item) {
                    storage.push({
                        index: index + 1,
                        coverimage: $(item).find('.am-cf .img_box .img').attr('href'),
                        link: $(item).find('.am-cf .img_box .img img').attr('src'),
                        title: $(item).find('.intro h3 a').text(),
                        summary: $(item).find('.intro .abstract').text(),
                        origin: $(item).find('.info .user-info .name').text(),
                        time: $(item).find('.time-div .time').prop('pubtime'),
                        tag: $(item).find('.tags-list span a').text(),
                        tag_link: $(item).find('.tags-list span a').attr('href'),
                    });
                });

            }
            return storage;
        });

        await browser.close();
        return JSON.stringify(data);
    }
}

module.exports = SpiderService;