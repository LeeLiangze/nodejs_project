# findOrInitialize() - 查找或初始化

````
findOrInitialize -> Promise.<Instance, initialized>
````

查找一行记录，如果不存在则创建（不保存）实例

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options          | Object          | 	               |
| options.where    | Object          | 	查询属性 |
| options.defaults | Object          | 用于创建新实例的默认值 |
| options.transaction | Transaction | 在事务中执行查询 |
| options.logging=false | Function | 一个用于打印查询时所执行sql的函数 |
| options.benchmark=false | Boolean | 当打印SQL日志时同时输出查询执行时间（毫秒） |

                                             

<-- [返回](../catalogue.md)