# 多对多(Belongs-To-Many)关联

Belongs-To-Many 关联是指一个源模型连接多个目标模型。而且，目标模型也可以有多个相关的源。

````
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
````

这会创建一个新模型UserProject其中会projectId和userId两个外键。是否使用驼峰命名取决与相关联的两个表。

定义through选项后，Sequelize会尝试自动生成名字，但并一定符合逻辑。

在本例中，会为User添加方法 getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects, addProject, and addProjects

有时我们会对连接的模型进行重命名，同样可以使用as实现。如，将User 命名为Workers ，将Project 命名为 Tasks：


````
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })
````

foreignKey让你可以设置through关系中的源模型，而otherKey让你可以through关系中的目标模型。

````
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
````

belongsToMany同样可以用来定义自连接：

````
Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })
// 这会创建 PersonChildren 表，其中存储了对象的 id
````

如果想为连接表添加更多属性，可以建立关联前在sequelize 中为连接表定义一个模型，这会告诉sequelize 使用这个表建立关联而不是创建新表：

````
User = sequelize.define('user', {})
Project = sequelize.define('project', {})
UserProjects = sequelize.define('userProjects', {
    status: DataTypes.STRING
})
 
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
````

要为user 添加一个新的project 并设置状态，可以在设置器中传入一个额外的对象，这个属性会包含在连接表中：

````
user.addProject(project, { status: 'started' })
````

默认情况下会向UserProjects表中添加projectId 和 userId，并移除之前已定义的主键属性表并由两个表的主键组建唯一标识，且没有额外的PK 列。要强制为UserProjects添加主键可以手工添加：

````
UserProjects = sequelize.define('userProjects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: DataTypes.STRING
})
````

Belongs-To-Many 可以基于through关系查询并可以选择查询属性：

````
User.findAll({
  include: [{
    model: Project,
    through: {
      attributes: ['createdAt', 'startedAt', 'finishedAt'],
      where: {completed: true}
    }
  }]
});
````


<-- [返回](../catalogue.md)