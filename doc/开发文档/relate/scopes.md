# Scopes - 作用域

关系作用域允许你设置一个作用范围（一组用于设置和创建的默认属性）。作用域同样也以放在通过 n:m 建立关系的表的关联模型（关联目标）中。

## 1:m

假设有Comment, Post 和 Image三个表，Comment表可以通过commentable_id和commentable字段分别关联image 或 post 表关联：

````
this.Comment = this.sequelize.define('comment', {
  title: Sequelize.STRING,
  commentable: Sequelize.STRING,
  commentable_id: Sequelize.INTEGER
}, {
  instanceMethods: {
    getItem: function() {
      return this['get' + this.get('commentable').substr(0, 1).toUpperCase() + this.get('commentable').substr(1)]();
    }
  }
});

this.Post.hasMany(this.Comment, {
  foreignKey: 'commentable_id',
  constraints: false,
  scope: {
    commentable: 'post'
  }
});
this.Comment.belongsTo(this.Post, {
  foreignKey: 'commentable_id',
  constraints: false,
  as: 'post'
});

this.Image.hasMany(this.Comment, {
  foreignKey: 'commentable_id',
  constraints: false,
  scope: {
    commentable: 'image'
  }
});
this.Comment.belongsTo(this.Image, {
  foreignKey: 'commentable_id',
  constraints: false,
  as: 'image'
});
````

constraints: false禁止了引用限制-因为commentable_id列会引用多个表，所以不能添加REFERENCES选项限制它。注意，这样就为Image -> Comment 和 Post -> Comment之间关系定义了一个作用域，commentable:'image'和commentable:'post'分别对应了不同的表。这个作用域会自动应用到关联函数中：

````
image.getComments()
SELECT * FROM comments WHERE commentable_id = 42 AND commentable = 'image';

image.createComment({
  title: 'Awesome!'
})
INSERT INTO comments (title, commentable_id, commentable) VALUES ('Awesome!', 42, 'image');

image.addComment(comment);
UPDATE comments SET commentable_id = 42, commentable = 'image'
````

而Comment模型的工具函数getItem 会根据commentable的不同而进行简单的转换为getImage或getPost。

# n:m

继续使用多态模型，一个标签(tag)表－一个项目(item)可以有多个标签，而一个标签也可以属于多个项目。

下面是一个简单示例，一个Post模型和Tag模型，而现实中标签往往被关联到多个其它模型：

````
ItemTag = sequelize.define('item_tag', {
  tag_id: {
    type: DataTypes.INTEGER,
    unique: 'item_tag_taggable'
  },
  taggable: {
    type: DataTypes.STRING,
    unique: 'item_tag_taggable'
  },
  taggable_id: {
    type: DataTypes.INTEGER,
    unique: 'item_tag_taggable',
    references: null
  }
});
Tag = sequelize.define('tag', {
  name: DataTypes.STRING
});

Post.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    unique: false,
    scope: {
      taggable: 'post'
    }
  },
  foreignKey: 'taggable_id',
  constraints: false
});
Tag.belongsToMany(Post, {
  through: {
    model: ItemTag,
    unique: false
  },
  foreignKey: 'tag_id'
});
````

作用范围列(taggable)实关联到了through关系模型(ItemTag)。

我们可以定义一个更严格的关联关系，如为post 应用获取所有pending状态的标签的作用范围：

````
Post.hasMany(Tag, {
  through: {
    model: ItemTag,
    unique: false,
    scope: {
      taggable: 'post'
    }
  },
  scope: {
    status: 'pending'
  },
  as: 'pendingTags',
  foreignKey: 'taggable_id',
  constraints: false
});

Post.getPendingTags();
SELECT `tag`.*  INNER JOIN `item_tags` AS `item_tag`
ON `tag`.`id` = `item_tag`.`tagId`
  AND `item_tag`.`taggable_id` = 42
  AND `item_tag`.`taggable` = 'post'
WHERE (`tag`.`status` = 'pending');
````


<-- [返回](../catalogue.md)