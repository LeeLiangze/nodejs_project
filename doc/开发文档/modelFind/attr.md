# Attributes - 属性与查询字段

查询时，如果只需要查询模型的部分属性，可以在通过在查询选项中指定attributes实现。该选项是一个数组参数，在数组中指定要查询的属性即可，这些要查询的属性就表示要在数据库查询的字段：

````
Model.findAll({
  attributes: ['foo', 'bar']
});
SELECT foo, bar ...
````

查询属性（字段）可以通过传入一个嵌套数据进行重命名：

````
Model.findAll({
  attributes: ['foo', ['bar', 'baz']]
});
SELECT foo, bar AS baz ...
````

通过sequelize.fn方法可以进行聚合查询：

````
Model.findAll({
  attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
});
SELECT COUNT(hats) AS no_hats ...
````

在使用聚合函数时，要给聚合字段指定一个别名。如，在上例中我们为聚合函数指定了别名'no_hats'，这样我们就能在查询的回调函数实例中通过instance.get('no_hats')来访问聚合统计的结果。

当需要查询所有字段并对某一字段使用聚合查询时，而只需要以对象的形式传入attributes并添加include子属性即可。

````
// 拽定全查询字段比较麻烦
Model.findAll({
  attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
});

// 这样会比较简短，且在你添加/删除属性后不会出错
Model.findAll({
  attributes: { include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']] }
});
SELECT id, foo, bar, baz, quz, COUNT(hats) AS no_hats ...
````

全部查询时，可以通过exclude子属性来排除不需要查询的字段：

````
Model.findAll({
  attributes: { exclude: ['baz'] }
});
SELECT id, foo, bar, quz ...
````



<-- [返回](../catalogue.md)