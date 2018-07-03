# 一对一(One-To-One)关联

一对一关联是由一个单一的外键，实现两个模型之间的精确关联。

## BelongsTo - 属于

BelongsTo关联表示一对一关系的外键存在于源模型。

如，下例中Player是通过外键关联的Team的一部分：

````
var Player = this.sequelize.define('player', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});

Player.belongsTo(Team); // 会为Player添加一个teamId 属性以保持与Team 主键的关系
````

## 外键

默认情况下，一个属于关系的外键将从目标模型的名称和主键名称生成。

默认命名使用驼峰式命名，而在源模型中添加了underscored: true配置，将使用蛇型命名。

````
var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company); // 会为user 添加 companyId 属性

var User = this.sequelize.define('user', {/* attributes */}, {underscored: true})
  , Company  = this.sequelize.define('company', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true
    }
  });

User.belongsTo(Company); // 会为user 添加 company_uuid 属性 
````

在定义中使用as命名时，会将其做为目标模型的名称：

````
var User = this.sequelize.define('user', {/* attributes */})
  , UserRole  = this.sequelize.define('userRole', {/* attributes */});

User.belongsTo(UserRole, {as: 'role'}); // 会为 user添加 roleId 属性而不是 userRoleId
````

在任命情况下，使用使用了foreignKey选项，外键名都会使用此选项值。我可以在Sequelize 中像下面这样使用外键：

````
var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company, {foreignKey: 'fk_company'}); // 为User 添加fk_company 外键
````

## 目标键

目标键是位于目标模型上通过源模型外键列指向的列。默认情况下，目标键是会belongsTo关系中目标模型的主键。要使用自定义列，请用targetKey选项来指定：

````
var User = this.sequelize.define('user', {/* attributes */})
  , Company  = this.sequelize.define('company', {/* attributes */});

User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // 为User 添加 fk_companyname 目标键
````

## HasOne - 拥有一个

HasOne关联表示一对一关系的外键存在于目标模型。

````
var User = sequelize.define('user', {/* ... */})
var Project = sequelize.define('project', {/* ... */})
 
// hasOne 关系
Project.hasOne(User)

/*
  在这个示例中，hasOne会添加一个projectId 属性到User模型中
  另外，Project.prototype 中会增加根据传入的第一个定义参数生成的访问器方法 getUser 和 setUser 置。
  如果启用了underscore 设置，添加的属性会是 project_id 而不是 projectId.

  外键会存在于users 表中

  你同样可以自定义外键，如：你想使用一个已存在数据库:
*/
 
Project.hasOne(User, { foreignKey: 'initiator_id' })
 
/*
  因为 Sequelize 会访问器使用模型名（定义时的第一个参数）,
  如果不使用这个名称，可以在hasOne 的选项中指定:
*/
 
Project.hasOne(User, { as: 'Initiator' })
// 这时会有 Project#getInitiator 和 Project#setInitiator
 
// 或者可以定义一些自引用
var Person = sequelize.define('person', { /* ... */})
 
Person.hasOne(Person, {as: 'Father'})
// 会为Person 增加一个FatherId 属性
// 同样可以自定义外键：
Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})
// 会为Person 增加一个 DadId 属性
 
// 这两种情况下都会有以下两个方法:
Person#setFather
Person#getFather
 
// 如果想对一个表做两次连接查询:
Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});

Game.belongsTo(Team);
````

虽然被称为HasOne 关联，但大多数 1:1关系中通常会使用BelongsTo 关联，因为BelongsTo 会在源模型中添加外键，而HasOne 则会在目标模型中添加外键。

## HasOne 与BelongsTo 的不同

在1:1 的关系中，可使用HasOne 或BelongsTo来定义。但它们的使用场景有所不同，下面通过一个例子来说明。

我们有两张表，会别关联到Player 和Team模型，定义如下：

````
var Player = this.sequelize.define('player', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});
在Sequelize 中我们可以源和目标模型的形式将二者建立联系。如将Player 做为源模型，而将Team做为目标模型：

Player.belongsTo(Team);
//Or
Player.hasOne(Team);
或Team 做为源模型，而将Player做为目标模型：

Team.belongsTo(Player);
//Or
Team.hasOne(Player);
````

HasOne 和 BelongsTo 插入外键的位置有所不同。HasOne 会向目标模型中插入关联键，而BelongsTo 会向源模型中插入关联键。

一个演示HasOne 和 BelongsTo使用的示例：

````
var Player = this.sequelize.define('player', {/* attributes */})
  , Coach  = this.sequelize.define('coach', {/* attributes */})
  , Team  = this.sequelize.define('team', {/* attributes */});
````
  
假设Player模型通过teamId列与其团队建立联系，每个团队的教练Coach信息通过coachId列存储。在这些 1:1 场景中需要以不同的方式建立关系，因为模型外键的存储位置不同。

当信息关联是存在于当前源模型时，我们可以使用belongsTo。在上面示例中，Player适合使用belongsTo，因为它有teamId列。

````
Player.belongsTo(Team)  // `teamId` 会添加到 Player / 源模型
````

当信息关联是存在于当前目标模型时，我们可以使用hasOne。在上面示例中，Coach适合使用hasOne，因为model模型中存储了它的Coach信息的coachId字段。

````
Coach.hasOne(Team)  // `coachId` 会添加到 Team / 目标模型
````


<-- [返回](../catalogue.md)