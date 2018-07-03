# model层

[Sequelize](http://sequelizejs.com) plugin for Cmos.js.

## Install

```bash
$ npm i --save cmos-sequelize
$ npm install --save mysql2 
```


## 使用和设置

- `config.default.js`

```js
exports.sequelize = {
  dialect: 'mysql', 
  database: 'test',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
};
```

- `config/plugin.js`

``` js
exports.sequelize = {
  enable: true,
  package: 'cmos-sequelize'
}
```
- `package.json`
```json
{
  "scripts": {
    "migrate:new": "cmos-sequelize migration:create",
    "migrate:up": "cmos-sequelize db:migrate",
    "migrate:down": "cmos-sequelize db:migrate:undo"
  }
}
```


更多文档请查询 [Sequelize.js](http://sequelize.readthedocs.io/en/v3/)

## Model文件

model文件都放在 `app/model` 文件里.

## 调用方式

| model file      | class name            |
| --------------- | --------------------- |
| `user.js`       | `app.model.User`      |
| `person.js`     | `app.model.Person`    |
| `user_group.js` | `app.model.UserGroup` |

- 默认每个表会加入时间戳: `created_at datetime`, `updated_at datetime`.

## 例子

### Standard

Define a model first.

```js
// app/model/user.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: STRING,
    name: STRING(30),
    password: STRING(32),
    age: INTEGER,
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByPost = function* (login) {
    return yield this.findOne({
        where: {post: post }
    });
  }

  return User;
};

```

在service层 and controller层:

```js
// app/service/user.js
module.exports = app => {
  return class User extends app.Service {
    * index() {
      const users = yield this.ctx.model.User.findAll();
      this.ctx.body = users;
    }

    * show(post) {
      const user = yield this.ctx.model.User.findByPost(post);
      yield user.logSignin();
      this.ctx.body = user;
    }
  }
}

// app/controller/controller.js
module.exports = app => {
  return class UserController extends app.Controller {
    * posts() {
      const ctx = this.ctx;
      const posts = yield ctx.service.post.list(ctx.query);
      ctx.body = {
        returnCode: 0,
        returnMessage: '成功',
        bean: {},
        beans: posts
      }
    }

    * post() {
      const ctx = this.ctx;
      const post = yield ctx.service.post.find(ctx.params.post);
      ctx.body = {
        code: 0,
        message: '成功',
        bean: {},
        beans: post
      }
    }
  }
}
```

## 迁移

package.json里面定义的命令：

| Command | Description |
|-----|------|
| npm run migrate:new | Generate a new Migration file to ./migrations/ |
| npm run migrate:up | Run Migration |
| npm run migrate:down | Rollback once Migration |

例子:

```bash
$ npm run migrate:up
```

或者 `production` 环境:

```bash
$ NODE_ENV=production npm run migrate:up
```

例子

```js
'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(function *(db, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;

    yield db.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });

    yield db.addIndex('users', ['email'], { indicesType: 'UNIQUE' });
  }),

  down: co.wrap(function *(db, Sequelize) {
    yield db.dropTable('users');
  }),
};
```

sequelize官方文档 [Sequelize - Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) 来学习更多迁移.

