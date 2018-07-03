# bulkCreate() - 创建多条记录

````
bulkCreate(records, [options]) -> Promise.<Array.<Instance>>
````

批量创建并保存多个实例。

处理成功后，会在回调函数中返回一个包含多个实例的数组。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| records          | Array          | 要创建实例的对象（键/值 对）列表 |
| options          | Object          | 	               |
| options.fields | Array          | 插入每条记录前进行验证 |
| options.hooks=true | Boolean | 在执行前/后创建钩子 |
| options.individualHooks=false | Boolean | 在执行前/后为每个实例创建钩子 |
| options.ignoreDuplicates=false | Boolean | 忽略重复主键（Postgres不支持） |
| options.updateOnDuplicate | Array | 如果行键已存在是否更新（mysql & mariadb支持）. 默认为更新 |
| options.transaction | Transaction | 在事务中执行查询 |
                                             


<-- [返回](../catalogue.md)