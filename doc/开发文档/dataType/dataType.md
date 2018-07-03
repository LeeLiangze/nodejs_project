# DataTypes类
DataTypes是一个含有常用数据类型的类，它用于使用sequelize.define()方法定义模型时指定列的数据类型：

````
sequelize.define('model', {
  column: DataTypes.INTEGER
})
````

注意：我们也可以通过模块的顶级对象Sequelize来引用指定的类型，如Sequelize.INTEGER，这种只是对DataTypes类中相关属性的一个便捷引用，其本质上还是引用了DataTypes类中相关属性。

在定义模型时，我们可以简单的传入一个字符串表示数据类型，但更多的时候是使用类型定义。如，使用DataTypes.BLOB时，Sequelize获取后会返回一个Buffer实例。

某些数据类型具有可访问的特殊属性，以便更改数据类型。如，与要补零得到一个无符号整数，可以使用DataTypes.INTEGER.UNSIGNED.ZEROFILL。

为数据类型指定长度时，可以像函数一样引用：INTEGER(2)。

NOW、UUIDV1、UUIDV4这三个是用于指定默认值，所以不能用于类型定义。如，定义一个UUID类型并指定默认值为v1版本的uuid：

````
sequelize.define('model', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
  }
})
如果想想自己的算法生成自定义的UUID默认值，可以为defaultValue指定一个返回UUID的函数：

sequelize.define('model', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: function() {
      return generateMyId()
    },
    primaryKey: true
  }
})
````


<-- [返回](../catalogue.md)