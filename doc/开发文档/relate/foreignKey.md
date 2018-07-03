# 外键

Sequelize中，如果创建了两个模型之间的关联，那么相关联的外键会被自动创建：

````
var Task = this.sequelize.define('task', { title: Sequelize.STRING })
  , User = this.sequelize.define('user', { username: Sequelize.STRING })
 
User.hasMany(Task)
Task.belongsTo(User)
````

会生成以下SQL 语句：

````
CREATE TABLE IF NOT EXISTS `User` (
  `id` INTEGER PRIMARY KEY,
  `username` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Task` (
  `id` INTEGER PRIMARY KEY,
  `title` VARCHAR(255),
  `user_id` INTEGER REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);
````

task 和 user之间的关系通过task表的外键user_id引入，并REFERENCES引用user表。默认情况下，引用的user 如果被删除那么user_id会被设置为NULL，并且会随user id的更新而更新。这些选项可以在建立关系时通过MonUpdate和onDelete选项修改。可选项有：

````
RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL
````

对于 1:1 和 1:m 的关系，默认的删除选项是SET NULL，更新选项是CASCADE。而 n:m 的关系，两者都是CASCADE。这意味着，你从 n:m 关系的任一方删除或更新数据，其所对应的关联数据也会同时被删除或更新。

添加表之间的约束意味着，使用sequelize.sync创建表时，相关的表在数据库中必须有一定创建顺序。如果Task 表引用了User，那么User 必须在Task 之前创建。有时这会导致循环引用，想象一个场景：一个文档和版本，一个文档可以有多个版本，并且为了方便，文档对它的当前版本有一个引用。

````
var Document = this.sequelize.define('document', {
      author: Sequelize.STRING
    })
  , Version = this.sequelize.define('version', {
      timestamp: Sequelize.DATE
    })

Document.hasMany(Version) // 添中 document_id 到 version中
Document.belongsTo(Version, { as: 'Current', foreignKey: 'current_version_id'}) // 添加 current_version_id 到文档中
````

这时可能出现类似以下错误：

````
Cyclic dependency found. 'Document' is dependent of itself. Dependency Chain: Document -> Version => Document
````

为了解决这个问题，可以传入一个constraints: false选项：

````
Document.hasMany(Version)
Document.belongsTo(Version, { as: 'Current', foreignKey: 'current_version_id', constraints: false})
````

这时会按以下顺序将表同步到数据库中：

````
CREATE TABLE IF NOT EXISTS `Document` (
  `id` INTEGER PRIMARY KEY,
  `author` VARCHAR(255),
  `current_version_id` INTEGER
);
CREATE TABLE IF NOT EXISTS `Version` (
  `id` INTEGER PRIMARY KEY,
  `timestamp` DATETIME,
  `document_id` INTEGER REFERENCES `Document` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);
````

## 没有约束的外键引用

有时我们想添加一个外键引用，但不想添加任何约束或关系。这种情形下，你可以在schema定义时手动添加reference属性：

````
var Series, Trainer, Video
 
// 在调用Trainer.hasMany(series)方法的，Series 有一个 trainer_id=Trainer.id 的外键引用
Series = sequelize.define('series', {
  title:        DataTypes.STRING,
  sub_title:    DataTypes.STRING,
  description:  DataTypes.TEXT,
 
  // Set FK relationship (hasMany) with `Trainer`
  trainer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "trainers",
      key: "id"
    }
  }
})
 
Trainer = sequelize.define('trainer', {
  first_name: DataTypes.STRING,
  last_name:  DataTypes.STRING
});
 
// 在调用Series.hasOne(Video)后，Video has a series_id=Series.id 的外键引用……
Video = sequelize.define('video', {
  title:        DataTypes.STRING,
  sequence:     DataTypes.INTEGER,
  description:  DataTypes.TEXT,
 
  // 为`Series`设置 hasOne关系
  series_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Series, // 可以是一个表示表名的字符串或模型引用
      key:   "id"
    }
  }
});
 
Series.hasOne(Video);
Trainer.hasMany(Series);
````

<-- [返回](../catalogue.md)