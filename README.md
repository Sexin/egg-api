# api



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

### 部署

- 启动 npm run start --port=7001 --daemon --title=egg-server-showcase
- 关闭 npm run stop --title=egg-server-showcase

[egg]: https://eggjs.org

### sequelize

- 升级数据库 npx sequelize db:migrate --env=${env}
- 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
- npx sequelize db:migrate:undo
- 可以通过 `db:migrate:undo:all` 回退到初始状态
- npx sequelize db:migrate:undo:all
- 修改数据库字段npx sequelize migration:generate --name=init-users

