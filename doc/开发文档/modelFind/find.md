# 查询排序

order选项用于查询结果的排序数据。排序时应该传入一个包含属性-排序方向的元组/数组，以保证正确的转义：

````
something.findOne({
  order: [
    // 转义 username 并对查询结果按 DESC 方向排序
    ['username', 'DESC'],

    // 按 max(age) 排序
    sequelize.fn('max', sequelize.col('age')),

    // 按 max(age) DESC 排序
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // 按 otherfunction(`col1`, 12, 'lalala') DESC 排序
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

    // 按相关联的User 模型的 name 属性排序
    [User, 'name', 'DESC'],

    // 按相关联的User 模型的 name 属性排序并将模型起别名为 Friend
    [{model: User, as: 'Friend'}, 'name', 'DESC'],

    // 按相关联的User 模型的嵌套关联的 Company 模型的 name 属性排序
    [User, Company, 'name', 'DESC'],
  ]
  // 以下所有声明方式都会视为字面量，应该小心使用
  order: 'convert(user_name using gbk)'
  order: 'username DESC'
  order: sequelize.literal('convert(user_name using gbk)')
})
````


<-- [返回](../catalogue.md)