# restore() - 恢复记录

````
restore(options) -> Promise.<undefined>
````

恢复多个实例，当启用paranoid时

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options          | Object          | 	               |
| options.where    | Object          | 	筛选条件 |
| options.hooks=true | Boolean          | 在执行前/后创建钩子 |
| options.individualHooks=false | Boolean | 在执行前/后为每个实例创建钩子 |
| options.limit | Number  | 要删除的行数 |
| options.transaction | Transaction | 在事务中执行查询 |

                                             

<-- [返回](../catalogue.md)