# 通过关联创建实例

一个实例可以在一个步骤中创建嵌套关联，且提供所有元素都是新的。

## 通过BelongsTo 或HasOne 关系创建实例

对于如相模型：

````
var Product = this.sequelize.define('product', {
  title: Sequelize.STRING
});
var User = this.sequelize.define('user', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
});

Product.belongsTo(User);
// `hasOne`同样适用
一个Product和User在同一步中被创建：

return Product.create({
  title: 'Chair',
  User: {
    first_name: 'Mick',
    last_name: 'Broadstone'
  }
}, {
  include: [ User ]
});
````

## 通过BelongsTo 关系的别名创建

````
var Creator = Product.belongsTo(User, {as: 'creator'});

return Product.create({
  title: 'Chair',
  creator: {
    first_name: 'Matt',
    last_name: 'Hansen'
  }
}, {
  include: [ Creator ]
});
````

## 通过HasMany 或BelongsToMany 关系创建实例

对于以下关系的模型：

````
var Tag = this.sequelize.define('tag', {
  name: Sequelize.STRING
});

Product.hasMany(Tag); // `belongsToMany` 同样适用
````

现在我们可以创建一个project 同时创建多个相关联的tag：

````
Product.create({
  id: 1,
  title: 'Chair',
  Tags: [
    { name: 'Alpha'},
    { name: 'Beta'}
  ]
}, {
  include: [ Tag ]
})
````

在使用别名时也可以使用：

````
var Categories = Product.hasMany(Tag, {as: 'categories'});

Product.create({
  id: 1,
  title: 'Chair',
  categories: [
    {id: 1, name: 'Alpha'},
    {id: 2, name: 'Beta'}
  ]
}, {
  include: [{
    model: Categories,
    as: 'categories'
  }]
})
````



<-- [返回](../catalogue.md)