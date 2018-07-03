# create() - 创建保存新实例

````
create(values, [options]) -> Promise.<Instance>
````

构建一个新的模型实例，并进行保存。与build()方法不同的是，此方法除创建新实例外，还会将其保存到对应数据库表中。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| values          | Object          | 	               |
| options          | Object          | 	               |
| options.raw=false | Boolean          | 设置为true时，值会忽略字段和虚拟设置器 |
| options.isNewRecord=true | Boolean | 在事务中执行查询 |
| options.fields | Array | 如果设置后，只有列表中区别的列才会进行保存 |
| options.include | Array | 用于构建prefetched/included模型 |
| options.onDuplicate | String |  |
| options.transaction | Transaction | 在事务中执行查询 |
| options.logging=false | Function | 一个用于打印查询时所执行sql的函数 |
| options.benchmark=false | Boolean | 当打印SQL日志时同时输出查询执行时间（毫秒） |

                                             


<-- [返回](../catalogue.md)