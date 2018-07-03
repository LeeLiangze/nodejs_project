# 原始查询方法

默认情况下，该函数会返回两个参数 - 一个包含结果的数组和一个包含原数据对象。请注意，由于是原始查询，所以返回的元数据与使用的数据库类型有关，其对元数据的处理并不一致。

````
sequelize.query("UPDATE users SET y = 42 WHERE x = 12").spread(function(results, metadata) {
  // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
})
````

如果不想使用元数据，可以查询时指定表示查询类型的type参数，以告诉sequelize 应该怎样去格式化返回结果。

````
sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
  .then(function(users) {
    // 并不需要在这spread 展开结果，因为所返回的只有所查询的结果
  })
````
  
在选项参数中，可以使用model参数指定一个模型，指定后会将查询结果会是传入模型的实例：

````
// 调用已定义的模型并对其创建实例
sequelize.query('SELECT * FROM projects', { model: Projects }).then(function(projects){
  // 每条记录都是一个Project 实例
})
````



<-- [返回](../catalogue.md)