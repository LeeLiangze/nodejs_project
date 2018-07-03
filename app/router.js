'use strict';

module.exports = app => {
  app.get('/', 'client.index');
  // upload
  app.post('/v1/upload', 'uploadfile');
  // auth
  app.post('/v1/login', 'user.login');
  app.get('/v1/logout', 'user.logout');
  app.post('/v1/register', 'user.register');
  // post
  app.get('/v1/posts', 'post.posts');
  app.get('/v1/posts/:id', 'post.post');
  app.post('/v1/users/:user_id/posts', 'post.create');
  app.put('/v1/users/:user_id/posts/:id', 'post.update');
  app.del('/v1/users/:user_id/posts/:id', 'post.del');
};