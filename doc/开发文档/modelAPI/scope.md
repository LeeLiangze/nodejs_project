# scope() - 应用限制范围

````
scope(options*) -> Model
````

在应用在define定义模型时创建的作用范围。如，在定义模型时我们会像下面这样创建作用范围：

## 使用示例
```js
var Model = app.model.define('model', attributes, {
  defaultScope: {
    where: {
      username: 'dan'
    },
    limit: 12
  },
  scopes: {
    isALie: {
      where: {
        stuff: 'cake'
      }
    },
    complexFunction: function(email, accessLevel) {
      return {
        where: {
          email: {
            $like: email
          },
          accesss_level {
            $gte: accessLevel
          }
        }
      }
    }
  }
})
```


定义默认的限制范围后，默认限制会在每次查询时起作用：
```js
Model.findAll() // WHERE username = 'dan'
Model.findAll({ where: { age: { gt: 12 } } }) // WHERE age > 12 AND username = 'dan'
```

我们可以通过scope()像下面这样应用限制范围：
```js
Model.scope({ method: ['complexFunction' 'dan@sequelize.com', 42]}).findAll()
// WHERE email like 'dan@sequelize.com%' AND access_level >= 42
```



<-- [返回](../catalogue.md)