# count() - 统计查询结果数

````
count([options]) -> Promise.<Integer>
````

统计符合查询条件的结果总数。

如果提供了include，将计算匹配关联的数目

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options         | Object          |                  |
| options.where   | Object          | 一个描述查询限制范围（WHERE条件）的对象 |
| options.attributes | **Array.String Object** | 要查询的属性（字段）列表，或一个include 和 exclude 对象的键。要对属性进行重命名，可以传入一个包含两个元素的数组－第一个表示属性在数据库中的名称或（或一些类似Sequelize.literal, Sequelize.fn等的表达式），第二个属性表示要在返回实例中使用的名称 |
| options.include | **Array.Object or Model** | 一个用于左连接的连接列表，支持 或 { include: [{ model: Model1, as: 'Alias' }]}的形式,如果你的连接要设置as (如 X.hasMany(Y, { as: 'Z }, 你需要将要加载的 Y 的as属性指定为Z) |
| options.distinct | boolean | 在主键上使用 COUNT(DISTINCT(col)), Model.aggregate 要使用其它列 |
| options.group | Object | 创建复杂统计时，会返回所需要的多行 |
| options.transaction | Transaction | 在事务中执行查询 |
| options.logging=false | Function | 一个用于打印执行SQL语句的函数 |
| options.benchmark=false | Boolean | 打印执行SQL语句时，同时输出执行时间（毫秒） |




<-- [返回](../catalogue.md)                                             
