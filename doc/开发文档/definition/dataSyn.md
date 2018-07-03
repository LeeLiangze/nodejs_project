# Database synchronization - 数据库同步

开始一个新项目时，我们并没有数据库结构，使用Sequelize时，并不需要先定义好数据库结构。我们只要定义好模型，然后进行同步即可。

Sequelize支持创建表和删除表：

````
// 通过 sync 方法同步数据结构
// 即,创建表
Project.sync()
Task.sync()

// 强制创建
// 通过设置 force 属性会首先删除表并重新创建
Project.sync({force: true})

// 删除表
Project.drop()
Task.drop()

// 事件处理
Project.[sync|drop]().then(function() {
  // 处理成功
}).catch(function(error) {
  // 出了点问题^~^
})
.sync({ force: true })会删除并重建表，这时我们可以添加match选项，只重建正则表达式匹配的表：

sequelize.sync({ force: true, match: /_test$/ });
````


<-- [返回](../catalogue.md)