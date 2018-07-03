# findOne() - 通过单条数据

````
findById(id, [options]) -> Promise.<Instance>
````

查询单个实例（单条数据）。这将会使用LIMIT 1查询条件，所以回调中总是返回单个实例。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options         | Object          |                  |
| options.transaction | Transaction | 在事务中执行查询 |

     
                                             
<-- [返回](../catalogue.md)
