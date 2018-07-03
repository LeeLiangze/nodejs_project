# truncate() - 截断模型

````
truncate([options]) -> Promise
````

截断模型的所有实例，这个方法是Model.destroy({ truncate: true })便捷方法。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| records          | Array          | 要创建实例的对象（键/值 对）列表 |
| options          | Object          | 	               |
| options.cascade=false | Boolean          | 仅适用于连接查询时的TRUNCATE操作，截断所有外键匹配的表 |
| options.transaction | Transaction | 在事务中执行查询 |
                                             


<-- [返回](../catalogue.md)