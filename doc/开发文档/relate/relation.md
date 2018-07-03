# 关系检查

我们可以检查一对象是否已与另一个对象建立关联，下面是一些检查示例：

````
// 检查对象是否是关联对象之一：
Project.create({ /* */ }).then(function(project) {
  return User.create({ /* */ }).then(function(user) {
    return project.hasUser(user).then(function(result) {
      // false
      return project.addUser(user).then(function() {
        return project.hasUser(user).then(function(result) {
          // true
        })
      })
    })
  })
})
 
// 检查所有对象是符合预期：
// 假设已有一个 project 和两个 users
project.setUsers([user1, user2]).then(function() {
  return project.hasUsers([user1]);
}).then(function(result) {
  // false
  return project.hasUsers([user1, user2]);
}).then(function(result) {
  // true
})
````



<-- [返回](../catalogue.md)