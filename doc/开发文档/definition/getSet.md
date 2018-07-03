# Getters & setters - 访问器&设置器

可以在你的模型中将对象属性定义为访问/设置函数

访问器&设置器有以下两种定义方式：

- 做为一个属性定义
- 做为模型选项

##做为一个属性定义

````
var Employee = sequelize.define('employee', {
  name:  {
    type     : Sequelize.STRING,
    allowNull: false,
    get      : function()  {
      var title = this.getDataValue('title');
      // 'this' allows you to access attributes of the instance
      return this.getDataValue('name') + ' (' + title + ')';
    },
  },
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
    set      : function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  }
});

Employee
  .create({ name: 'John Doe', title: 'senior engineer' })
  .then(function(employee) {
    console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
    console.log(employee.get('title')); // SENIOR ENGINEER
  })
````  
  
## 做为模型选项

在下面的示例中，定义了一个名为fullName的访问器，它是对this.firstname和this.lastname两个属性引用，这个属性的一个假属性它并不是数据库中的一部分。定义假属性可以使用访问器或定义为VIRTUAL类型两种方式，Virtual类型可以验证而访问器则不能。

````
var Foo = sequelize.define('foo', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  getterMethods   : {
    fullName       : function()  { return this.firstname + ' ' + this.lastname }
  },

  setterMethods   : {
    fullName       : function(value) {
        var names = value.split(' ');

        this.setDataValue('firstname', names.slice(0, -1).join(' '));
        this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
});
````

## 访问器&设置器内部定义的帮助函数：

检索底层属性值－总是使用this.getDataValue()

````
/* 访问 'title' 的属性 */
function() {
    return this.getDataValue('title');
}
设置底层属性值－总是使用this.setDataValue()

/* 设置 'title' 的属性 */
function() {
    return this.setDataValue('title', title.toString().toLowerCase());
}
````



<-- [返回](../catalogue.md)