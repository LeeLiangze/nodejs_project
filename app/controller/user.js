'use strict';

module.exports = app => {
    return class UserController extends app.Controller {
        * login() {
            const { ctx } = this;
            ctx.body = yield ctx.service.user.login(ctx.request.body);
        };

        * logout() {
            const { ctx } = this;
            ctx.session.adminUser = null;
            // this.retSuccess({ data: {success: 1} });
        };

        * register() {
            const { ctx } = this;
            const { data } = ctx.request.body;
            ctx.body = yield ctx.service.user.register(ctx.request.body);
        }
    };
};
