# findById() - 通过Id查询单条数据

````
findById(id, [options]) -> Promise.<Instance>
````

通过Id（主键）查询单个实例（单条数据）。

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| id              | Number or String or Buffer | 	要查询实例的主键 |
| options         | Object          |                  |
| options.transaction | Transaction | 在事务中执行查询 |

                                             

<-- [返回](../catalogue.md)