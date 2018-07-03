# Model.belongsTo() － 属于

````
Model.belongsTo(target, [options])
````

创建当前模型（源）到目标模型之间的关系，外键会被添加到源模型中。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| target         | Object          |                  |
| options         | Object          |    |
| options.hooks=false | boolean | 设置为 true 时，会在关联模型删除时执行 before-/afterDestroy 钩子方法 |
| options.as | string | 当前模型（源）的别名，单数形式。如果你为一个表创建多次关联，或者不想使用定义模型时使用的名称，那么就应该为模型指定一个别名。 |
| options.foreignKey | string or object  | 目标表中的外键名或相当于定义外键列的对象 (语法参考 Sequelize.define )。使用对象时，应该添加一个name来设置列名。默认的外键命名规为源模型名+源模型主键名|
| options.scope     | Object          |  键/值 集合，用于目标的创建和查找操作(sqlite 不支持 N:M)  |
| options.onDelete='SET NULL or NO ACTION' | string | 如果外允许空则 SET NULL，其它则 CASCADE |
| options.onUpdate='CASCADE' | string |  |
| options.constraints=true | boolean | 是否在删除或更新时启用外键约束 |

                                             

<-- [返回](../catalogue.md)