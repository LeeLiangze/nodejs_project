# 关联对象

因为Sequelize 做了很多逻辑运算等，你应该在定义完关系后sequelize.sync方法：

````
Project.belongsToMany(Task)
Task.belongsToMany(Project)
 
Project.create()...
Task.create()...
Task.create()...
 
// 保存……然后
project.setTasks([task1, task2]).then(function() {
  // saved!
})
 
// 保存后可以在then 中访问结果
project.getTasks().then(function(associatedTasks) {
  // associatedTasks 是一个task 数组 
})
 
// 同可以在访问器方法中进行筛选
// 这与传入一个普通这查询方法一样
project.getTasks({ where: 'id > 10' }).then(function(tasks) {
  // tasks 中 id 都大于 10 :)
})
 
// 可以检索相关对象的某些字段.
project.getTasks({attributes: ['title']}).then(function(tasks) {
    // 仅返回 "title" 和 "id"字段
})
通过设置(set)方法还可以移除已创建的关系：

// 称除与 task1 的关联
project.setTasks([task2]).then(function(associatedTasks) {
  // 现在只和 task2 有关系
})
 
// 移除所有关联
project.setTasks([]).then(function(associatedTasks) {
  // 现在返回一个空数组
})
 
// 或者直接删除
project.removeTask(task1).then(function() {
  // it's gone
})
 
// 也可以重新添加
project.addTask(task1).then(function() {
  // it's back again
})
也可像下面这样移除：

// project 与task1 和 task2有关系
task2.setProject(null).then(function() {
  // and it's gone
})
````

hasOne/belongsTo中同样适用：

````
Task.hasOne(User, {as: "Author"})
Task.setAuthor(anAuthor)
````

在自定义表连接中，可以通过两种方法添加关联关系：

````
// 在创建该关联之前，将属性添加到对象的连接表模型名称中
project.UserProjects = {
  status: 'active'
}
u.addProject(project)
 
// 或者，通过在添加关联时提供一个额外的参数，其中包含在联接表中的数据
u.addProject(project, { status: 'active' })
 
 
// 当关联多个对象时，同样可以使用上面两种方法
// 在本例中，提供一个包含在联接表中的数据额外的参数
project1.UserProjects = {
    status: 'inactive'
}
 
u.setProjects([project1, project2], { status: 'active' })
````

当获取自定义连接表的关联数据时，连接表会做为一个DAO 实例返回：

````
u.getProjects().then(function(projects) {
  var project = projects[0]
 
  if (project.UserProjects.status === 'active') {
    // .. do magic
 
    // 因为这里是一个真正的 DAO 实例，所以可以直接保存
    return project.UserProjects.save()
  }
})
````

如果只想获取关联表的部分属性，可以提供一个想要获取属性和数组：

````
user.getProjects({ attributes: ['name'], joinTableAttributes: ['status']})
````


<-- [返回](../catalogue.md)