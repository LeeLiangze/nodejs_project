# Import - 模型导入

我们可以将模型定义为一个单独的文件，并通过 导入。通过文件导入返回的对象与通过defined方法定义的模型完全一致，两者都是instance模型实例。自v1.5.0起，sequlize会对导入进行缓存，这样就不用担心多次对文件修改造成的一些问题。

如，我们在project.js文件中定义一个名为project的模型：

````
// 这个文件定义于 /path/to/models/project.js
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
}
````

我们可以app.js或其它需要的地方引入定义的模型：

````
var Project = sequelize.import(__dirname + "/path/to/models/project")
import同样可以使用回调函数参数的使用方式：

sequelize.import('project', function(sequelize, DataTypes) {
  return sequelize.define("project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
})
````



<-- [返回](../catalogue.md)