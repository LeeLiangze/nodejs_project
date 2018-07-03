# Configuration - 配置

定义模型时，可以通过配置来设置列名等相关信息：

````
var Bar = sequelize.define('bar', { /* bla */ }, {
  // 不要添加时间戳属性 (updatedAt, createdAt)
  timestamps: false,

  // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间
  // paranoid 属性只在启用 timestamps 时适用
  paranoid: true,

  // 不使用驼峰式命令规则，这样会在使用下划线分隔
  // 这样 updatedAt 的字段名会是 updated_at
  underscored: true,

  // 禁止修改表名. 默认情况下
  // sequelize会自动使用传入的模型名（define的第一个参数）做为表名
  // 如果你不想使用这种方式你需要进行以下设置
  freezeTableName: true,

  // 定义表名
  tableName: 'my_very_custom_table_name'
})
````

如果你想sequelize处理时间戳，但只在个别情况下使用，那么你可以对使用的列单独重载：

````
var Foo = sequelize.define('foo',  { /* bla */ }, {
  // 不要忘了启用 timestamps
  timestamps: true,

  // 不想使用 createdAt
  createdAt: false,

  // 想 updatedAt 的实际名为 'updateTimestamp'
  updatedAt: 'updateTimestamp'

  // 要将 deletedAt 设置为 destroyTime (注意要启用paranoid)
  deletedAt: 'destroyTime',
  paranoid: true
})
````

配置时，也可以修改数据库引擎。如，将默认的InnoDB修改为MyISAM：

````
var Person = sequelize.define('person', { /* attributes */ }, {
  engine: 'MYISAM'
})

// or globally
var sequelize = new Sequelize(db, user, pw, {
  define: { engine: 'MYISAM' }
})
或者指定一个表描述（MySql和PG中）：

var Person = sequelize.define('person', { /* attributes */ }, {
  comment: "I'm a table comment!"
})
````

注意：字段attributes同样可以添加comment属性，但出于兼容性考虑自sequelize V1.7+起已不再将此属性同步到数据库中，但为字段添加这个属性依然是增加可读性的不错的方式。



<-- [返回](../catalogue.md)