# sync() - 同步模型到数据库

````
sync() -> Promise.
````

同步Model结构到数据库中，即：在数据库中创建表。执行成功后，会在回调中返回模弄的实例（this）。

## 使用示例
```js
let User = app.model.define('user', {
  firstName: STRING,
  lastName: STRING
});

let Role = app.model.define('role', {
  roleName: STRING
});

let UserRole = app.model.define('userRole', {
  userId: INTEGER,
  roleId: STRING
});

User.sync().then(function(result){
    // 同步了'User'一个模型
})

sequelize.sync().then(function(result){
  // 同步了'Role'、'UserRole'、'UserRole'三个模型
})
```



<-- [返回](../catalogue.md)