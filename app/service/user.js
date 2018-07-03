'use strict';

const crypto = require('crypto');

module.exports = app => {
  return class User extends app.Service {
    * login(info) {
      // console.log('0000===',info.password)
      const user = yield this.ctx.model.User.findByUser(info.username);
      const md5 = crypto.createHash('md5');
      // console.log('1111===',user.password);
      const password = md5.update(user.username + info.password).digest('hex');
      // console.log('333===', password)
      // console.log('444===', user.encrypt)
      const token = app.jwt.sign({ cmos: 'cmos' }, app.config.jwt.secret);
      console.log('token=====', token);
      if (password === user.password) {
        const { ctx } = this;
        ctx.session.adminUser = { id:user.id, name:username };
        return true;
      }
      return false;
    }
    * register(info = {}) {
      const { ctx } = this;
      const encrypt = ctx.helper.createRandomStr(6);
      const md5 = crypto.createHash('md5');
      const password = md5.update(info.username + info.password).digest('hex');
      console.log(password)
      const user = {
        username: info.username,
        email: info.email,
        password,
      };
      return yield ctx.model.User.create(user);
    }
  };
};
