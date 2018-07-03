# aggregate() - 聚合查询

````
aggregate(field, aggregateFunction, [options]) -> Promise.<options.dataType|object>
````

在指定字段field上运行聚合查询。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| field           | String          | 要运行聚合的字段。可以是字段名或*号 |
| aggregateFunction | String          | 聚合函数，如sum, maxetc. |
| options         | Object          |                  |
| options.where   | Object          | 一个描述查询限制范围（WHERE条件）的对象 |
| options.logging=false | Function | 一个用于打印查询时所执行sql的函数 |
| options.dataType | DataType or String | 结果类型。如field是模型中的字段，默认为字段的类型，其它情况为默认为 float |
| options.distinct | boolean  | 为字段使用DISTINCT聚合查询 |
| options.transaction | Transaction | 在事务中运行查询 |
| options.plain | Boolean | 当为true时，第一个aggregateFunction的返回值为dataType指定和返回，如果添加了额外的属性，则由group分句决定。设置plain 为 false 时会返回所有返回行中的所有值 。默认为 true |
| options.benchmark=false | Boolean | 打印执行SQL语句时，同时输出执行时间（毫秒） |

                                             
<-- [返回](../catalogue.md)