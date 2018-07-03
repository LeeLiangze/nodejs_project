# addScope() - 添加限制范围

````
addScope(name, scope, [options])
````

为模型添加一个新的限制范围。在定义模型时如果未指定验证，这一方法会非常有用。

如果指定的限制已经存在，默认会抛出异常，这时可以传入override: true选项来解决。

## 参数

名称 | 类型 | 说明 
--- | --- | --- 
name | String | 限制范围名。使用defaultScope是，会替换默认的限制
scope | Object|Function | 
[options] | Object | 
[options.override=false] | Boolean | 


<-- [返回](../catalogue.md)