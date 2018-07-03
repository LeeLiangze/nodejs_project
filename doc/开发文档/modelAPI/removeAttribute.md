# removeAttribute() - 移除属性

````
removeAttribute([attribute])
````

从已定义的模型中移除属性

## 参数

名称 | 类型 | 说明 
--- | --- | --- 
[attribute] | String | 

## 使用示例
```js
let User = app.model.define('user', {
  firstName: STRING,
  lastName: STRING
});

User.sync().then(function(result){
  User.create({firstName:'xxxx', lastName:'xxxx'})
  .then(function(result){
    User.findOne({raw:true})
    .then(function(result){
      console.log(result); // { id: 1, firstName: 'xxxx', lastName: 'xxxx'}

      // 移'firstName'属性
      User.removeAttribute('firstName');
      User.findOne({raw:true})
      .then(function(result){
        console.log(result);  // // { id: 1, lastName: 'xxxx'}
      })
    })  
  })
})
```



<-- [返回](../catalogue.md)