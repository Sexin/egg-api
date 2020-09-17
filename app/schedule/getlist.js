const Subscription = require('egg').Subscription;
const cheerio = require('cheerio');

class GetlistCache extends Subscription {

    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '5s', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const page = await this.ctx.app.redis.get('list_flag')
        if (!!page) {
            const list = await this.ctx.service.xige.list(page);
            if (list.ReturnString) {
                const $ = cheerio.load(list.ReturnString);
                var $li = $('li');
                if ($li.length) {
                    $li.each(async (index, item) => {
                        if ($(item).children('.text_ul_img').length == 0) {
                            const result = await this.ctx.service.refrigeration.create({
                                title: $(item).find('.intro h3 a').text(),
                                img_mark_title: $(item).find('.am-cf .img_box .img_mark').text(),
                                origin: $(item).find('.info .user-info .name').text(),
                                summary: $(item).find('.intro .abstract').text(),
                                coverimage: $(item).find('.am-cf .img_box .img img').attr('src'),
                                link: $(item).find('.am-cf .img_box .img').attr('href'),
                                img_mark_link: $(item).find('.am-cf .img_box .img_mark').attr('href'),
                                tag_link: $(item).find('.tags-list span a').attr('href'),
                                time: $(item).find('.info .info-list .time-div .time').attr('pubtime'),
                                tag: $(item).find('.tags-list span a').text(),
                            })
                        }
                    });
                    await this.ctx.app.redis.set('list_flag', (parseInt(page) + 1));
                }
            }
        } else {
            await this.ctx.app.redis.set('list_flag', 1);
        }
    }
}

module.exports = GetlistCache;
