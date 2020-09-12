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

        await page.goto('https://www.baidu.com/', {
            waitUntil: ['domcontentloaded']
        });

        await page.screenshot({ path: 'static.png' });
        const data = await page.evaluate(() => {
            var storage = [];
            // 单页爬取
            var $li = $('#hotsearch-content-wrapper li');
            if ($li.length) {
                $li.each(function (index, item) {
                    if (index !== 0) {
                        storage.push({
                            index: $(item).find('.title-content-index').text(),
                            title: $(item).find('.title-content-title').text(),
                            link: $(item).find('a').attr('href'),
                        });
                    }

                });

            }
            return storage;
        });

        await browser.close();
        return JSON.stringify(data);
    }
}

module.exports = SpiderService;