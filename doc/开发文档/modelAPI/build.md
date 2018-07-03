# build() - 创建新实例

````
build(values, [options]) -> Instance
````

创建一个新的模型实例，Values参数为新例指定的键值对对象

## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| values          | Object          | 	               |
| options.raw=false | Boolean          | 设置为true时，值会忽略字段和虚拟设置器 |
| options.isNewRecord=true | Boolean | 在事务中执行查询 |
| options.include | Array | 用于构建prefetched/included模型 |

                                             


<-- [返回](../catalogue.md)