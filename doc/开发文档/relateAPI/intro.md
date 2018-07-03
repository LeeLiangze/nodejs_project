# 综合介绍

在Sequelize中创建关联通过调用模型（源）的 belongsTo / hasOne / hasMany / belongsToMany方法完成，并且为这个方法第一个参数提供另一个模型（目标）。各种方法以下规则创建关联：

- hasOne - 添加外键到目标模型，并以单数关系混入到源模型
- belongsTo - 为当前模型添加外键，并以单数关系混入到源模型
- hasMany - 添加外键到目标模型，并以复数关系混入到源模型
- belongsToMany - 为连接的表创建N:M关系并以复数关系混入到源模型。会通过sourceId和targetId创建交叉表。

在创建关系时，可以通过as选项指定别名。这在对一模型引用两次，或者对关联模型使用定义之外的名称时非常有用。

````
User.hasMany(Picture)
User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false })

user.getPictures() // 获取所有图片
user.getProfilePicture() // 仅获取主图

User.findAll({
  where: ...,
  include: [
    { model: Picture }, // 加载所有图片
    { model: Picture, as: 'ProfilePicture' }, // 加载主图，名称拼写必须与关联关系中命名相同
  ]
})
````

要完全控制通过Sequlize 添加的外键列，可以使用foreignKey选项。选项值可以是表示名称的字符串或类似使用sequelize.define进行模型定义时对象。

````
User.hasMany(Picture, { foreignKey: 'uid' })
````

这样外键列会使用uid代替默认的userId。

````
User.hasMany(Picture, {
  foreignKey: {
    name: 'uid',
    allowNull: false
  }
})
````

指定uid列不能为NULL。在大多数情况下，这将覆盖的外键约束，这sequelize自动创建的，这在外键禁用时非常有用。

当匹配关联模型时，可限制只匹配部分模型。这些查询条件与在find/findAll中的使用方式相同。如，只查找'jpg'格式的图片：

````
user.getPictures({
  where: {
    format: 'jpg'
  }
})
````



<-- [返回](../catalogue.md)