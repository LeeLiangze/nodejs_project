# findAndCount() - 分页查询

````
findAndCount([findOptions]) -> Promise.<Object>
````

查询由offset/limit指定的所有匹配行，并返回查询条件所匹配的总数量。

## 使用示例

````
Model.findAndCountAll({
  where: ...,
  limit: 12,
  offset: 12
}).then(function (result) {
  ...
})
````

在上面查询中，result是一个包含以两个属性的对象：

````
{
  rows: [],
  count: 
}
````

result.rows是匹配的查询行，result.count是查询条件匹配的总数量。

如果提供了include，将计算匹配关联的数目

````
User.findAndCountAll({
  include: [
     { model: Profile, required: true}
  ],
  limit 3
});
````


## 参数

| 名称             | 类型            | 说明              |
| --------------- | --------------- | ---------------  |
| options         | Object          |                  |

详细参见[findAll](./findAll.md)

<-- [返回](../catalogue.md)
                                             
