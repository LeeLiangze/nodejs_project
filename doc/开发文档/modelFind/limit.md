# limit/offset - 分页与限制返回结果数

查询进，我们可以使用limit限制返回结果条数，并可以通过offset来设置查询偏移（跳过）量，通过这两个属性我们可以实现分页查询的功能：

````
// 获取 10 条数据（实例）
Project.findAll({ limit: 10 })

// 跳过 8 条数据（实例）
Project.findAll({ offset: 8 })

// 跳过 5 条数据并获取其后的 5 条数据（实例）
Project.findAll({ offset: 5, limit: 5 })
````



<-- [返回](../catalogue.md)
