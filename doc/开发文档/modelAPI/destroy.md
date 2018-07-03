# destroy() - 删除记录

````
destroy(options) -> Promise.<Integer>
````

删除多个实例，或设置deletedAt的时间戳为当前时间（当启用paranoid时）

执行成功后返回被删除的行数

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options          | Object          | 	               |
| options.where    | Object          | 	筛选条件 |
| options.hooks=true | Boolean          | 在执行前/后创建钩子 |
| options.individualHooks=false | Boolean | 在执行前/后为每个实例创建钩子 |
| options.limit | Number  | 要删除的行数 |
| options.force=false | Boolean | 删除而不是设置 deletedAt 为当前时间戳 (仅启用 paranoid 时适用) |
| options.truncate=false | Boolean | 设置为true时，会使用TRUNCATE代替DELETE FROM，这时会忽略where和limit选项 |
| options.cascade=false | Boolean | 仅适用于连接查询时的TRUNCATE操作，截断所有外键匹配的表 |
| options.transaction | Transaction | 在事务中执行查询 |

                                             

<-- [返回](../catalogue.md)