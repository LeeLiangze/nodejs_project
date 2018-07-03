# Data retrieval / Finders - 数据索引/查找

查找方法是为了从数据库中查询数据，这些方法不是返回原始数据对象，而是返回模型实例。因会其返回的是模型实例，所以在文档的查询结果中可以任意调用模型实例的成员、方法等。（更多实例介绍请参考：instance）

下面是一些常用的查询方法。

## find - 从数据库中查找一个指定元素

````
// 按已知 id查找
Project.findById(123).then(function(project) {
  // project 是一个 Project 实例，且包含存储在数据中的数据
  // 当不存在 id 为123的记录时 project 为 null
})

// 按属性查找
Project.findOne({ where: {title: 'aProject'} }).then(function(project) {
  // project 是匹配到的第一个 title 为 'aProject' 的 Projects 或 null
})


Project.findOne({
  where: {title: 'aProject'},
  attributes: ['id', ['name', 'title']]
}).then(function(project) {
  // project 是匹配到的第一个 title 为 'aProject' 的 Projects 或 null
  // project 的 project.title 属性中会包含 'name'
})
````

## findOrCreate - 从数据库中查找一个指定元素如果不存在则创建记录

findOrCreate可用于检测一个不确定是否存在的元素，如果存在则返回记录，不存在时会使用提供的默认值新建记录。

如，当数据不存在时，其执行效果如下：

````
User
  .findOrCreate({where: {username: 'itbilu.com'}, defaults: {job: 'Technical Lead JavaScript'}})
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)

    /*
      {
        username: 'itbilu.com',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
  })
````  
  
当数据存在时，会返回记录：

````
User
  .create({ username: 'fnord', job: 'omnomnom' })
  .then(function() {
    User
      .findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}})
      .spread(function(user, created) {
        console.log(user.get({
          plain: true
        }))
        console.log(created)

        /*
          {
            username: 'fnord',
            job: 'omnomnom',
            id: 2,
            createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
            updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
          }
          created: false
        */
      })
  })
````  
  
## findAndCountAll - 从数据库中查找多个元素，返回数据与记录总数

这个方法是findAll和count两个方法的便捷形式，这在你想使用limit和offset进行分页查询时非常有用。

在返回值中，会包含以下两个属性：

- count - 整数，匹配到的总记录数
- rows - 对象数据，通过 limit 和 offset匹配的当前页数据

````
Project
  .findAndCountAll({
     where: {
        title: {
          $like: 'foo%'
        }
     },
     offset: 10,
     limit: 2
  })
  .then(function(result) {
    console.log(result.count);
    console.log(result.rows);
  });
````
  
findAndCountAll同样支持使用include包含，使用包含时只有将required设置为true才会添加到count部分：

````
User.findAndCountAll({
  include: [
     { model: Profile, required: true}
  ],
  limit: 3
});
````

使用include时，两个模型之间应该存在主/外键关系，如果不存在就应该在include中手工建立连接。

在上面的示例中，为Profile设置了required，所以在查询时会使用INNER JOIN内连接。

## findAll - 从数据库中查找多个元素

findAndCountAll中使用的查询选项同样适用于findAll方法。

````
// 查询多条记录
Project.findAll().then(function(projects) {
  // projects 是一个包含Project实例的数组
})

// 同样的，all是findAll的别名方法:
Project.all().then(function(projects) {
  // projects 是一个包含Project实例的数组
})

// 通过指定属性查找
Project.findAll({ where: { name: 'A Project' } }).then(function(projects) {
// projects 是一个包含 Project 实例的数组
})

// 查询时使用字符串替换
Project.findAll({ where: ["id > ?", 25] }).then(function(projects) {
  // projects 是一个包含 Project 实例的数组，各实例的id 大于25
})

// 查询指定范围
Project.findAll({ where: { id: [1,2,3] } }).then(function(projects) {
  // projects 是一个包含 Project 实例的数组，各实例id 是1, 2, 或 3
  // 这在实例执行时，会使用 IN查询
})

Project.findAll({
  where: {
    id: {
      $and: {a: 5}           // AND (a = 5)
      $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
      $gt: 6,                // id > 6
      $gte: 6,               // id >= 6
      $lt: 10,               // id < 10
      $lte: 10,              // id <= 10
      $ne: 20,               // id != 20
      $between: [6, 10],     // BETWEEN 6 AND 10
      $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
      $in: [1, 2],           // IN [1, 2]
      $notIn: [1, 2],        // NOT IN [1, 2]
      $like: '%hat',         // LIKE '%hat'
      $notLike: '%hat'       // NOT LIKE '%hat'
      $iLike: '%hat'         // ILIKE '%hat' (case insensitive)  (PG only)
      $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
      $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
      $contains: [1, 2]      // @> [1, 2] (PG array contains operator)
      $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
      $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
    },
    status: {
      $not: false,           // status NOT FALSE
    }
  }
})
````

## IN/OR 等复合筛选

如果要在查询中使用AND、OR或DOT等筛选条件，可以查询的where中指定$and、$or或$not等属性：

````
Project.findOne({
  where: {
    name: 'a project',
    $or: [
      { id: [1,2,3] },
      { id: { $gt: 10 } }
    ]
  }
})

Project.findOne({
  where: {
    name: 'a project',
    id: {
      $or: [
        [1,2,3],
        { $gt: 10 }
      ]
    }
  }
})
````

这个查询生成的实际SQL语句为：

````
SELECT *
FROM `Projects`
WHERE (
  `Projects`.`name` = 'a project'
   AND (`Projects`.`id` IN (1,2,3) OR `Projects`.`id` > 10)
)
LIMIT 1;
````

$not示例：

````
Project.findOne({
  where: {
    name: 'a project',
    $not: [
      { id: [1,2,3] },
      { array: { $contains: [3,4,5] } }
    ]
  }
});
````

将生成以下语句：

````
SELECT *
FROM `Projects`
WHERE (
  `Projects`.`name` = 'a project'
   AND NOT (`Projects`.`id` IN (1,2,3) OR `Projects`.`array` @> ARRAY[1,2,3]::INTEGER[])
)
LIMIT 1;
````

对数据集使用limit、offset、order 和 group

````
// 使用 limit 限制返回结果数
Project.findAll({ limit: 10 })

// 跳过前 10 条结果
Project.findAll({ offset: 10 })

// 跳过前 10 条结果后，返回两条数据
Project.findAll({ offset: 10, limit: 2 })
分组与排序的语法是相似的，如下：

Project.findAll({order: 'title DESC'})
// ORDER BY title DESC

Project.findAll({group: 'name'})
// GROUP BY name
传入简单的字符串时，查询字符串会逐字查询，即列名不转义。如果需要列名转义，可以提供一个数组参数。

something.findOne({
  order: [
    'name',
    // will return `name`
    'username DESC',
    // will return `username DESC` -- i.e. don't do it!
    ['username', 'DESC'],
    // will return `username` DESC
    sequelize.fn('max', sequelize.col('age')),
    // will return max(`age`)
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    // will return max(`age`) DESC
    [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [sequelize.fn('otherfunction', sequelize.fn('awesomefunction', sequelize.col('col'))), 'DESC']
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [{ raw: 'otherfunction(awesomefunction(`col`))' }, 'DESC']
    // This won't be quoted, but direction will be added
  ]
})
````

更多关于聚合查询，请参考：在Sequelize中使用group by分组聚合查询

## 原始查询

默情况下，Sequlize人为查询结构创建实例，通过这个实例可以进行数据的更新、删除等操作。有时候我只需要显示数据集，而不需要进行处理，这时可以通过设置raw选项来返回原始数据：

````
// 增加 raw 选项后，会返回数据库中的原始结果
Project.findAll({ where: { ... }, raw: true })
count - 统计数据库中的元素数

count可以统计数据库中的元素数：

Project.count().then(function(c) {
  console.log("There are " + c + " projects!")
})

Project.count({ where: ["id > ?", 25] }).then(function(c) {
  console.log("There are " + c + " projects with an id greater than 25.")
})
max - 查找指定表中最大值

// 数据库中有3条记录，年龄分别是 10, 5, 40
Project.max('age').then(function(max) {
  // 会返回 40
})

Project.max('age', { where: { age: { lt: 20 } } }).then(function(max) {
  // 会返回 10
})
min - 查找指定表中最小值

// 数据库中有3条记录，年龄分别是 10, 5, 40
Project.min('age').then(function(min) {
  // 会返回 5
})

Project.min('age', { where: { age: { $gt: 5 } } }).then(function(min) {
  // 会返回 10
})
sum - 对指定属性求和

// 数据库中有3条记录，年龄分别是 10, 5, 40
Project.sum('age').then(function(sum) {
  // 会返回 55
})

Project.sum('age', { where: { age: { $gt: 5 } } }).then(function(sum) {
  // 会返回 50
})
````



<-- [返回](../catalogue.md)