# upsert() - 创建或更新

````
upsert(values, [options]) -> Promise.<created>
````

创建或更新一行。如果匹配到主键或唯一约束键时会进行更新。

##执行详细

- MySQL - 做为单条查询执行 INSERT values ON DUPLICATE KEY UPDATE values
- PostgreSQL - 作为一个临时性的异常处理函数来实现: INSERT EXCEPTION WHEN unique_constraint UPDATE
- SQLite - 做为两条查询执行 INSERT; UPDATE。这意味着，无论该行是否存在都会进行更新


## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| values          | Object          | 	               |
| options          | Object          | 	               |
| options.validate=true | Boolean          | 插入前进行验证 |
| options.fields=Object.keys(this.attributes) | Array | 要插入/更新字段。默认全部 |
| options.transaction | Transaction | 在事务中执行查询 |

                                             

<-- [返回](../catalogue.md)