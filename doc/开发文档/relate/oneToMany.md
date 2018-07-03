# 一对多(One-To-Many)关联

One-To-Many关联是指一个源模型连接多个目标模型。反之目标模型都会有一个明确的源。

````
var User = sequelize.define('user', {/* ... */})
var Project = sequelize.define('project', {/* ... */})
 
// 定义 hasMany 关联
Project.hasMany(User, {as: 'Workers'})
````
会向 User 中添加一个projectId或project_id属性。Project 的实例中会有访问器getWorkers 和 setWorkers。这是一种单向关联方式，如果两个模型间还有其它关联方式请参考下面的多对多关系。



<-- [返回](../catalogue.md)