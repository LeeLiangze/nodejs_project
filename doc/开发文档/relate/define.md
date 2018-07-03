# 命名策略

默认情况下，Sequelize会使用模型名（名称通过sequelize.define）来识别模型并与其它模型建立关联。如，一个名为user的模型，会向其实例添加get/set/add User等函数，且一个.user属性会在预加载模型中，而对于一个名为User模型来说会添加相同的函数，但预加载中会使用.User属性。

我在前面介绍过，可以使用as对模型起一个别名。在单一的关系中（hasOne或belongsTo），别名应该使用单数形式，而在多重关系中（hasMany）应该使用复数形式。Sequelize会使用inflection库，对别名的单复数形式进行转换。然而这一转换在非英语单词中可能不适用，这时我们以同时指定单数和复数两个别名：

````
User.belongsToMany(Project, { as: { singular: 'task', plural: 'tasks' }})
````

如果你希望总是使用相同的别名，那么可以定义模型时指定：

````
var Project = sequelize.define('project', attributes, {
  name: {
    singular: 'task',
    plural: 'tasks',
  }
})
 
User.belongsToMany(Project);
````

会向 user 实例中添加add/set/get Tasks等函数。

请注意使用as指定别名后，同时也会改变关联的外键列，比较保险的做法是同时指定外键列：

````
Invoice.belongsTo(Subscription)
Subscription.hasMany(Invoice)
````

不使用as时，一般会生成一个subscriptionId的外键，而通过Ivoice.belongsTo(Subscription, { as: 'TheSubscription' })指定别名后，外键会变成theSubscriptionId，这时可以通过foreignKey选项解决这个问题：

````
Invoice.belongsTo(Subscription, , { as: 'TheSubscription', foreignKey: 'subscription_id' })
Subscription.hasMany(Invoice, { foreignKey: 'subscription_id' )
````


<-- [返回](../catalogue.md)