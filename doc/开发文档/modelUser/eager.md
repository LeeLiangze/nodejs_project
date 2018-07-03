# Eager loading - 预加载

从数据库中加载数据时，除数据本身外还想得到与之相关联的数据－这就是所谓的预加载。也就是说，使用find或findAll查询数据时，通过include属性同时加载关联的数据。

##假设有以下数据结构：

````
var User = sequelize.define('user', { name: Sequelize.STRING })
  , Task = sequelize.define('task', { name: Sequelize.STRING })
  , Tool = sequelize.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

sequelize.sync().then(function() {
  // this is where we continue ...
})
````

##通过belongsTo与hasMany建立关系后，就可以像下面这样查询：

````
Task.findAll({ include: [ User ] }).then(function(tasks) {
  console.log(JSON.stringify(tasks))

  /*
    [{
      "name": "A Task",
      "id": 1,
      "createdAt": "2013-03-20T20:31:40.000Z",
      "updatedAt": "2013-03-20T20:31:40.000Z",
      "userId": 1,
      "user": {
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z"
      }
    }]
  */
})
````

## 由于Task与User是1对多的关系，所在以查询时user会做为一个对象属性被同时加载。

下面我们进行一个多对多的查询：

````
User.findAll({ include: [ Task ] }).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "tasks": [{
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "userId": 1
      }]
    }]
  */
})
````

## 在多对多的关系中，相关数据会做为一个数组属性被同时加载。

关联查询时，可以使用as选项为关系数据指定别名：

````
User.findAll({ include: [{ model: Tool, as: 'Instruments' }] }).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "Instruments": [{
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "userId": 1
      }]
    }]
  */
})
````

关联查询时，同样可以使用where选项对关联数据进行筛选：

````
User.findAll({
    include: [{
        model: Tool,
        as: 'Instruments',
        where: { name: { $like: '%ooth%' } }
    }]
}).then(function(users) {
    console.log(JSON.stringify(users))

    /*
      [{
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z",
        "Instruments": [{
          "name": "Toothpick",
          "id": 1,
          "createdAt": null,
          "updatedAt": null,
          "userId": 1
        }]
      }],

      [{
        "name": "John Smith",
        "id": 2,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z",
        "Instruments": [{
          "name": "Toothpick",
          "id": 1,
          "createdAt": null,
          "updatedAt": null,
          "userId": 1
        }]
      }],
    */
  })
````
注意：使用include.where条件时，include.requied会被隐式的设置为true，即在查询时会使用INNER JOIN内连接。

## 全关联

如果多个模型间存在关联关系，而我们在查询时又要查询所有的数据，就可以设置all: true来关联所有模型：

````
User.findAll({ include: [{ all: true }]});
````

包括软删除的数据

如果要在结果中包含软删除的数据，请将include.paranoid设置为true：

````
User.findAll({
    include: [{
        model: Tool,
        where: { name: { $like: '%ooth%' } },
        paranoid: true // 查询并加载软删除的数据
    }]
});
````

## 预加载关联数据的排序

在1对多（one-to-many）的关系中：

````
Company.findAll({ include: [ Division ], order: [ [ Division, 'name' ] ] });
Company.findAll({ include: [ Division ], order: [ [ Division, 'name', 'DESC' ] ] });
Company.findAll({
  include: [ { model: Division, as: 'Div' } ],
  order: [ [ { model: Division, as: 'Div' }, 'name' ] ]
});
Company.findAll({
  include: [ { model: Division, as: 'Div' } ],
  order: [ [ { model: Division, as: 'Div' }, 'name', 'DESC' ] ]
});
Company.findAll({
  include: [ { model: Division, include: [ Department ] } ],
  order: [ [ Division, Department, 'name' ] ]
});
在多对多（many-to-many）的关系中同样可以使用排序：

Company.findAll({
  include: [ { model: Division, include: [ Department ] } ],
  order: [ [ Division, DepartmentDivision, 'name' ] ]
});
````

嵌套预加载

可以在关联模型中嵌套预加载关系模型：

````
User.findAll({
  include: [
    {model: Tool, as: 'Instruments', include: [
      {model: Teacher, include: [ /* etc */]}
    ]}
  ]
}).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "Instruments": [{ // 1:M and N:M association
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "userId": 1,
        "Teacher": { // 1:1 association
          "name": "Jimi Hendrix"
        }
      }]
    }]
  */
})
````

这会生成一个外连接，但where子句的关系模型会使用内连接并返回唯一一个子句：

````
User.findAll({
  include: [{
    model: Tool,
    as: 'Instruments',
    include: [{
      model: Teacher,
      where: {
        school: "Woodstock Music School"
      },
      required: false
    }]
  }]
}).then(function(users) {
  /* ... */
})
````

include同样支持嵌套加载：

````
User.findAll({ include: [{ all: true, nested: true }]});
````



<-- [返回](../catalogue.md)