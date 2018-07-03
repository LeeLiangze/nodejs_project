# describe() - 查询表信息

````
describe() -> Promise
````

运行一个表的描述查询，返回结果中将包含属性及其类型：

## 使用例子

````
let User = app.model.define('user', {
  firstName: STRING,
  lastName: STRING
});

User.describe().then(function(result){
  console.log(result);
})
// 结果如下
{ id: 
   { type: 'INT(11)',
     allowNull: false,
     defaultValue: null,
     primaryKey: true },
  firstName: 
   { type: 'VARCHAR(255)',
     allowNull: true,
     defaultValue: null,
     primaryKey: false },
  lastName: 
   { type: 'VARCHAR(255)',
     allowNull: true,
     defaultValue: null,
     primaryKey: false }
}
````

                                             

<-- [返回](../catalogue.md)