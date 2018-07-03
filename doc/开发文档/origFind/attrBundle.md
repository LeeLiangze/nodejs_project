# 参数绑定

参数绑定类似于参数替换。尤其是参数替换会在发送到数据库前被sequelize转义和替换，而参数绑定会被发送到SQL 查询文本外。

只有SQLite 和 PostgreSQL支持参数绑定，其它类型数据库都会将其插入到SQL 查询，并以相同的方式进行参数替换。参数绑定可以使用$1、$2……或$key的形式：

- 如果传入的是数组，$1会绑定到数组听第1个参数 (bind[0])
- 如果传入一个对象，$key会绑定到object['key']。每个key 必须以非数字的字符开始。$1不是个有效的key，尽管object['1'] 是存在的。
- 在使用$$时，不会被转义而是将$做为一个字面量使用。

传入的数组或对象必须包含所有绑定值，否则Sequelize会抛出异常。这同样适用于数据库可能会忽略绑定参数的情况下。

数据库可能会做进一步限制，绑定参数不能使用数据库关键字，也不能是表或列名，它在引用文本或数据时也可能被忽略。在PostgreSQL中，如果不能从上下文$1::varchar中推断类型，那么也需要进行类型转换。

````
sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $1',
  { bind: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
  { bind: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})
````



<-- [返回](../catalogue.md)