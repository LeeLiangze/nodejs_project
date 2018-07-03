# Validations - 验证

模型验证，让我们可以模型的每个属性执行验证。

我们通过模型列属性的validate属性来添加验证，这些验证会在模型实例执行create、update和save自动执行。也可以通过instance.validate()方法，来手工验证模型实例。

````
var ValidateMe = sequelize.define('foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // 只允许字母
      is: /^[a-z]+$/i,          // 只允许字母
      not: ["[a-z]",'i'],       // 不能使用字母
      isEmail: true,            // 检测邮箱格式 (foo@bar.com)
      isUrl: true,              // 检查Url格式 (http://foo.com)
      isIP: true,               // 检查 IPv4 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4
      isIPv6: true,             // 检查 IPv6
      isAlpha: true,            // 不能使用字母
      isAlphanumeric: true,     // 只允许字母数字字符
      isNumeric: true,          // 只能使用数字
      isInt: true,              // 只能是整数
      isFloat: true,            // 只能是浮点数
      isDecimal: true,          // 检查数字
      isLowercase: true,        // 检查小写字母
      isUppercase: true,        // 检查大写字母
      notNull: true,            // 不允许null
      isNull: true,             // 只能为null
      notEmpty: true,           // 不能空字符串
      equals: 'specific value', // 只能使用指定值
      contains: 'foo',          // 必须包含子字符串
      notIn: [['foo', 'bar']],  // 不能是数组中的任意一个值
      isIn: [['foo', 'bar']],   // 只能是数组中的任意一个值
      notContains: 'bar',       // 不能包含子字符串
      len: [2, 10],              // 值的长度必在 2 和 10 之间
      isUUID: 4,                // 只能是UUID
      isDate: true,             // 只能是日期字符串
      isAfter: "2011-11-05",    // 只能使用指定日期之后的时间
      isBefore: "2011-11-05",   // 只能使用指定日期之前的时间
      max: 23,                  // 允许的最大值
      min: 23,                  // 允许的最小值
      isArray: true,            // 不能使用数组
      isCreditCard: true,       // 检查是有效的信用卡

      // 也可以自定义验证:
      isEven: function(value) {
        if(parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
        // we also are in the model's context here, so this.otherField
        // would get the value of otherField if it existed
        }
      }
    }
  }
});
````

验证时可以使用自定义的错误信息代替validator.js的默认信息，只需要在通过对象或数组的方式提供参数即可：

````
isInt: {
  msg: "Must be an integer number of pennies"
}
````

或者参数中同样需要提供args属性：

````
isIn: {
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
````

## 模型验证

Validations同可以用于模型的检测，只需要在字段定义之后定义验证即可。如，在经纬度的应用的我们会需要latitude和longitude都不为空或都为空，这时我们可以像下面这样验证：

````
var Pub = Sequelize.define('pub', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
}, {
  validate: {
    bothCoordsOrNone: function() {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
})
````



<-- [返回](../catalogue.md)