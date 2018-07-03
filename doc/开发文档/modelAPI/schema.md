# schema() - 指定schema

````
schema(schema, [options]) -> this
````

为Model指定schema（数据库）。在postgres中将会设置为"schema"."tableName"，而在mysql和sqlite中将会设置为'schema.tablename'

## 参数

名称 | 类型 | 说明 
--- | --- | --- 
schema | String | schema名
[options] | Object | 
[options.schemaDelimiter='.'] | String | schema与表名的分隔符
[options.logging=false] | Function | 一个函数用于打印查询时的sql
[options.benchmark=false] | Boolean | 在打印日志时同时输出执行SQL花费的时候（毫秒）



<-- [返回](../catalogue.md)