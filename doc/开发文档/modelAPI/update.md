# update() - 更新记录

````
update(values, options) -> Promise.<Array.<affectedCount, affectedRows>>
````

更新所匹配的多个实例。promise回调中会返回一个包含一个或两个元素的数组，第一个元素始终表示受影响的行数，第二个元素表示实际影响的行（仅Postgreoptions.returning为true时受支持）

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| values          | Object          | 	               |
| options          | Object          | 	               |
| options.where    | Object          | 	筛选条件 |
| options.fields    | Array          | 	要更新字段，默认为全部 |
| options.validate=true    | Boolean  | 更新每条记录前进行验证 |
| options.hooks=true | Boolean          | 在执行前/后创建钩子 |
| options.individualHooks=false | Boolean | 在执行前/后为每个实例创建钩子 |
| options.sideEffects=true   | Boolean  | 是否更新任何虚拟设置 |
| options.returning=false   | Boolean  | 返回受影响的行 (仅适用于 postgres) |
| options.limit | Number  | 要删除的行数 |
| options.silent=false | Boolean | 如果为true，updatedAt字段将不会更新 |
| options.transaction | Transaction | 在事务中执行查询 |

                                             

<-- [返回](../catalogue.md)