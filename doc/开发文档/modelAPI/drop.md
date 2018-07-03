# drop() - 删除数据库中的表

````
drop([options]) -> Promise
````

删除Model在数据库中对应的表。

## 参数

名称 | 类型 | 说明 
--- | --- | --- 
[options] | Object | 
[options.cascade=false] | Boolean | 同时移除依赖于该表的对象，如视图。仅 postgres适用
[options.logging=false] | Function | 一个函数用于打印查询时的sql
[options.benchmark=false] | Boolean | 在打印日志时同时输出执行SQL花费的时候（毫秒）



<-- [返回](../catalogue.md)