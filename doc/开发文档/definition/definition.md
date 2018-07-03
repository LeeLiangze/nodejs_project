# Definition - 模型定义

定义模型model和表之间的映射关系使用define方法。定义时Sequelize会自动为其添加createdAt和updatedAt两个属性（属性相当于表中的字段），这样你就可以知道数据什么时候插入了数据库和什么时候进行了更新

````
var Project = app.model.define('project', {
  title: STRING,
  description: TEXT
})

var Task = app.model.define('task', {
  title: STRING,
  description: TEXT,
  deadline: DATE
})
````

定义模型时可以为列设置一些选项：

````
var Foo = app.model.define('foo', {
 // 实例化时在没有显式设置属性值时，会自动设置为 true
 flag: { type: BOOLEAN, allowNull: false, defaultValue: true},

 // 日期默认值 => 当前时间
 myDate: { type: DATE, defaultValue: Sequelize.NOW },

 // 设置 allowNull 选项为 false 后，会为列添加  NOT NULL 非空限制
 // 这意味着当执行查询（插入/更新）时相关字段为空会从数据库层抛出错误
 // 如果想在执行查询时进行值检测，请参考“验证”一节
 title: { type: Sequelize.STRING, allowNull: false},

 // 添加唯一（unique）约束后插入重复值会报错
 // unique属性可以是boolean 或 string类型
 // 如果为多个字段添加了相同的字符串那么将会是一个符合唯一键
 someUnique: {type: Sequelize.STRING, unique: true},
 uniqueOne: { type: Sequelize.STRING,  unique: 'compositeIndex'},
 uniqueTwo: { type: Sequelize.INTEGER, unique: 'compositeIndex'}

 // unique属性以一个简单的简写方式创建唯一索引
 someUnique: {type: Sequelize.STRING, unique: true}
 // 同样的，也可以模型的选项中创建索引
 {someUnique: {type: Sequelize.STRING}},
 {indexes: [{unique: true, fields: ['someUnique']}]}

 // 定义一个主键
 identifier: { type: Sequelize.STRING, primaryKey: true},

 // autoIncrement 选项用于创建一个自增的整型列
 incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },

 // Comments 可以在MySQL 和 PG中指定定段描述
 hasComment: { type: Sequelize.INTEGER, comment: "I'm a comment!" },

 // 可以通过 "field" 属性来指定数据库中的字段名
 fieldWithUnderscores: { type: Sequelize.STRING, field: "field_with_underscores" },

 // 通过references选项可以创建外键:
 bar_id: {
   type: Sequelize.INTEGER,

   references: {
     // 引用另一个模型
     model: Bar,

     // 连接模型的列表
     key: 'id',

     // 强制使用外键约束，仅适用于 PostgreSQL
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 }
})
````

如果你不想在模型中使用时间戳，而只需要一些时间；或者你正在使用一个已经存在的数据库，而其中的列名与你的所需要并不一致。
                                             

<-- [返回](../catalogue.md)