# Expansion of models - 模型扩展

开始一个新项目时，我们并没有数据库结构，使用Sequelize时，并不需要先定义好数据库结构。我们只要定义好模型，然后进行同步即可。


##自定义方法

Sequelize允许我们为实例添加自定义方法，可以像下面这样定义：

````
var Foo = sequelize.define('foo', { /* attributes */}, {
  classMethods: {
    method1: function(){ return 'smth' }
  },
  instanceMethods: {
    method2: function() { return 'foo' }
  }
})

// Example:
Foo.method1()
Foo.build().method2()
````

## 虚拟访问器

也可以设置虚拟访问器：

````
var User = sequelize.define('user', { firstname: Sequelize.STRING, lastname: Sequelize.STRING }, {
  instanceMethods: {
    getFullname: function() {
      return [this.firstname, this.lastname].join(' ')
    }
  }
})

// Example:
User.build({ firstname: 'foo', lastname: 'bar' }).getFullname() // 'foo bar'
````

## 全局方法

还可以定义用于所有模型实例的全局方法：

````
var sequelize = new Sequelize('database', 'username', 'password', {
  // Other options during the initialization could be here
  define: {
    classMethods: {
      method1: function() {},
      method2: function() {}
    },
    instanceMethods: {
      method3: function() {}
    }
  }
})

// Example:
var Foo = sequelize.define('foo', { /* attributes */});
Foo.method1()
Foo.method2()
Foo.build().method3()
````

## 索引

Sequelize支持添加索引，在模型中定义后，索引会在Model.sync()或sequelize.sync后创建。下面是几种添加索引的方式：

````
sequelize.define('user', {}, {
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['email']
    },

    // Creates a gin index on data with the jsonb_path_ops operator
    {
      fields: ['data'],
      using: 'gin',
      operator: 'jsonb_path_ops'
    },

    // By default index name will be [table]_[fields]
    // Creates a multi column partial index
    {
      name: 'public_by_author',
      fields: ['author', 'status'],
      where: {
        status: 'public'
      }
    },

    // A BTREE index with a ordered field
    {
      name: 'title_index',
      method: 'BTREE',
      fields: ['author', {attribute: 'title', collate: 'en_US', order: 'DESC', length: 5}]
    }
  ]
})
````




<-- [返回](../catalogue.md)