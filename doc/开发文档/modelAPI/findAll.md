# findAll() - 查询多条数据

````
findAll([options]) -> Promise.<Array.<Instance>>
````

查询多个实例（多条数据）。

## 使用示例

- 在查询中使用AND和=:

````
Model.findAll({
  where: {
    attr1: 42,
    attr2: 'cake'
  }
})
// WHERE attr1 = 42 AND attr2 = 'cake'
````

- 在查询中使用大于、小于等:

````
Model.findAll({
  where: {
    attr1: {
      $gt: 50
    },
    attr2: {
      $lte: 45
    },
    attr3: {
      $in: [1,2,3]
    },
    attr4: {
      $ne: 5
    }
  }
})
// WHERE attr1 > 50 AND attr2 <= 45 AND attr3 IN (1,2,3) AND attr4 != 5
````

- 在查询中使用OR:

````
Model.findAll({
  where: {
    name: 'a project',
    $or: [
      {id: [1, 2, 3]},
      {
        $and: [
          {id: {gt: 10}},
          {id: {lt: 100}}
        ]
      }
    ]
  }
});

//WHERE `Model`.`name` = 'a project' AND (`Model`.`id` IN (1, 2, 3) OR (`Model`.`id` > 10 AND `Model`.`id` < 100));
````

查询成功后会返回包含多个实例（instance）的数组。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options         | Object          |                  |
| options.where   | Object          | 一个描述查询限制范围（WHERE条件）的对象 |
| options.attributes | **Array.String Object** | 要查询的属性（字段）列表，或一个include 和 exclude 对象的键。要对属性进行重命名，可以传入一个包含两个元素的数组－第一个表示属性在数据库中的名称或（或一些类似Sequelize.literal, Sequelize.fn等的表达式），第二个属性表示要在返回实例中使用的名称 |
| options.attributes.include | **Array.String** | 选择所有模型属性并添加一些附加值，用于聚合计算。如{attributes:{include:[[sequelize.fn('COUNT', sequelize.col('id')),'total']]} |
| options.attributes.exclude | **Array.String**  | 选择模型中除少数属性外的所有属性，这主要出于安全目录。|
| options.paranoid=true | Boolean |为true时，只会未删除的记录会返回，否则会返回删除和未删除的全部记录 |
| options.include | **Array.Object or Model** | 一个用于左连接的连接列表，支持 或 { include: [{ model: Model1, as: 'Alias' }]}的形式,如果你的连接要设置as (如 X.hasMany(Y, { as: 'Z }, 你需要将要加载的 Y 的as属性指定为Z) |
| options.include[].model | Model | 你想要加载的模型 |
| options.include[].as | String | 别名关系，如果你想对要加载的模型起别名。对于 hasOne / belongsTo, 这地应该使用单数形式名，而对于hasMany则应该使用复数形式名 |
| options.include[].association | Association | 想要加载的关系(这可以用来替代提供的一个model/as对) |
| options.include[].where | Object | 用于子模型的WHERE分句。注意，这会对要加载的使用内连接，除非显示指定required: false |
| options.include[].or=false | Boolean | 是否将 ON 和 WHERE 分名与 OR绑定在一起而不是替换 AND |
| options.include[].on | Object | 为连接提供你的 ON 条件 |
| options.include[].attributes | Array.<String> | 要从子模型中查询的属性列表 |
| options.include[].required | Boolean | 如果为true，会转换为内连接。这意味着，只有匹配到子模型的父模型才会被加载。include.where设置后为True，其它情况 false |
| options.include[].separate | Boolean | 如果为true，运行一个单独的查询来获取关联的实例，仅支持hasMany关系 |
| options.include[].limit | Number | 限制连接的行数，仅在include.separate=true时支持 |
| options.include[].through.where | Object | 为 belongsToMany 关系，过滤连接的模型 |
| options.include[].through.attributes | Array | 在 belongsToMany 关系中，连接模型选择的属性列表 |
| options.include[].include | **Array.Object or Model** | 进一步嵌套相关模型 |
| options.order | **String or Array or Sequelize.fn** | 指定一个排序. 如果是字符串，那么会进行编码。如果是数组，那么可以依次提供多组列名/排序函数，每一组包含两个元素，第一个是排序字段名，第二个是排序方式，如: order: [['name', 'DESC']]。这种情况下，列名会进行编码而排序方向不会 |
| options.limit | Number |  |
| options.offset | Number |  |
| options.transaction | Transaction | 在事务中执行查询 |
| options.lock | String or Object | 锁定已选行. 可选项有: transaction.LOCK.UPDATE、 transaction.LOCK.SHARE，Postgres还支持: supports transaction.LOCK.KEY_SHARE、 transaction.LOCK.NO_KEY_UPDATE 和指定模型的连接锁详见 transaction.LOCK |
| options.raw | Boolean | 返回原始结果 |
| options.logging=false | Function | 一个用于打印执行SQL语句的函数 |
| options.having | Object |  |
| options.benchmark=false | Boolean | 打印执行SQL语句时，同时输出执行时间（毫秒） |

                                             

<-- [返回](../catalogue.md)