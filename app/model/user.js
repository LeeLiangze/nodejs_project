'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(30),
    email: STRING(30),
    password: STRING(30),
    remember_token: (100),
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.findByUser = function* (username) {
    return yield this.findOne({
      where: {username: username},
      attributes: ['id', 'username', 'email', 'password']
    });
  };

  return User;
};
