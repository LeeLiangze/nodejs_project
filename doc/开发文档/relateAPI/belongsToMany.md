# Model.belongsToMany() － 多对多

````
Model.belongsToMany(target, [options])
````

创建连接表的 N:M 的关系

````
User.belongsToMany(Project, { through: 'UserProjects' })
Project.belongsToMany(User, { through: 'UserProjects' })
````

定义中指定需要through时，sequelize会尝试自动生成名字，但生成的名字并不一定符合逻辑。

你通过自定义属性定义一个模型，它的属性可以用两种方式添加/设置关联。

````
var UserProjects = sequelize.define('UserProjects', {
  started: Sequelize.BOOLEAN
})
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
jan.addProject(homework, { started: false }) // homework 工程还未开始
jan.setProjects([makedinner, doshopping], { started: true}) // shopping和dinner 两种方式都会启动
````

如果你想设置多个目标实例，但是有不同的属性，这时必须在实例上设置属性：

````
p1.UserProjects = {
  started: true
}
user.setProjects([p1, p2], {started: false}) 
````

类似的，使用自定义属性连接表时，这些属性将做为一个对象的名称：

````
user.getProjects().then(function (projects) {
  var p1 = projects[0]
  p1.UserProjects.started // Is this project started yet?
})
````

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| target         | Object          |                  |
| options         | Object          |    |
| options.hooks=false | boolean | 设置为 true 时，会在关联模型删除时执行 before-/afterDestroy 钩子方法 |
| options.through | Model or string or object |  在N:M 的关联中，用于连接源 和 目标 表的名称  |
| options.through.model | Model |  用于连接 N:M 关系的模型  |
| options.through.scope | object |  用于建立关联的键/值集合，并通过模型查找默认值。  |
| options.through.unique=true | boolean |  设置为 true时，唯一键会从使用的外键中生成  |
| options.as | string | 当前模型（源）的别名，单数形式。如果你为一个表创建多次关联，或者不想使用定义模型时使用的名称，那么就应该为模型指定一个别名。 |
| options.foreignKey | string or object  | 目标表中的外键名或相当于定义外键列的对象 (语法参考 Sequelize.define )。使用对象时，应该添加一个name来设置列名。默认的外键命名规为源模型名+源模型主键名|
| options.targetKey  | Object          |  用于关联目标表的字段名。默认为目标表的主键。 |
| options.onDelete='SET NULL or NO ACTION' | string | 如果外允许空则 SET NULL，其它则 CASCADE |
| options.onUpdate='CASCADE' | string |  |
| options.constraints=true | boolean | 是否在删除或更新时启用外键约束 |

                                             

<-- [返回](../catalogue.md)