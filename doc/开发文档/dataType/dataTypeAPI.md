# STRING

````
STRING()
STRING(64)
````

将字段指定为变长字符串类型。默认长度为 255

可用属性：BINARY



# CHAR

````
CHAR()
CHAR(64)
````

将字段指定为定长字符串类型。默认长度为 255

可用属性：BINARY



# TEXT

````
TEXT()
````

将字段指定为(无)有限长度的文本列。可用长度：tiny, medium, long



# INTEGER

INTEGER()
32位整型

可用属性：UNSIGNED,ZEROFILL



# BIGINT

````
BIGINT()
````

64位整型

可用属性：UNSIGNED,ZEROFILL



# FLOAT

````
FLOAT()
````

4位精度的浮点数，接受一个或两个参数表示精度

可用属性：UNSIGNED,ZEROFILL



# REAL

````
REAL()
````

4位精度的浮点数，接受一个或两个参数表示精度

可用属性：UNSIGNED,ZEROFILL



# DOUBLE

````
DOUBLE()
````

8位精度的浮点数，接受一个或两个参数表示精度

可用属性：UNSIGNED,ZEROFILL



# DECIMAL

````
DECIMAL()
````

小数，接受一个或两个参数表示精度

可用属性：UNSIGNED,ZEROFILL



# BOOLEAN

````
BOOLEAN()
````

小数，接受一个或两个参数表示精度



# TIME

````
TIME()
````

指定为时间类型列



# DATE

````
DATE()
````

指定为日期时间类型列



# DATEONLY

````
DATEONLY()
````

指定为日期类型列



# HSTORE

````
HSTORE()
````

指定为键/值类型列，仅Postgres适用



# JSON

````
JSON()
````
指定为JSON字符串类型列，仅Postgres适用



# JSONB

````
JSONB()
````
指定为预处理的JSON数据列，仅Postgres适用



# NOW

````
NOW()
````

一个表示当前时间戳的默认值



# BLOB

````
BLOB()
````

二进制存储类型，可用长度：tiny, medium, long



# RANGE

````
RANGE()
````

Range类型是表示某种元素类型的值范围的数据类型，仅Postgres适用



# UUID

````
UUID()
````

UUID类型列，其默认值可以为UUIDV1或UUIDV4



# UUIDV1

````
UUIDV1()
````

设置UUID类型列，的默认值为 UUID v1



# UUIDV4

````
UUIDV4()
````

设置UUID类型列，的默认值为 UUID v4



# VIRTUAL

````
VIRTUAL()
````

一个不存储在数据库中的虚拟值。这种列在类型在需要提供一个默认值，但又不需要将其存储到数据库中时很适用。

也可以用于在重新排列和存储前进行验证。如，对密码做哈希运算前进行长度验证：

````
sequelize.define('user', {
  password_hash: DataTypes.STRING,
  password: {
    type: DataTypes.VIRTUAL,
    set: function (val) {
       this.setDataValue('password', val); 
       this.setDataValue('password_hash', this.salt + val);
     },
     validate: {
        isLongEnough: function (val) {
          if (val.length < 7) {
            throw new Error("Please choose a longer password")
         }
      }
    }
  }
})
````

在上面代码中，密码字段是存在的所以可以进行验证，但由于是虚拟类型，并不会将其存入数据库中。


# ENUM

````
ENUM()
DataTypes.ENUM('value', 'another value')
````

枚举类型



# ARRAY

````
ARRAY()
DataTypes.ARRAY(DataTypes.DECIMAL)
````

数组类型，仅Postgres适用



# GEOMETRY

````
ARRAY()
DataTypes.ARRAY(DataTypes.DECIMAL)
````

几何类型，仅Postgres(PostGIS)及MySQL适用。在MySQL中可用的几何类型有：'POINT'、'LINESTRING'、'POLYGON'

使用时，GeoJSON是可用的输入和返回值。

在PostGIS中，GeoJSON通过PostGIS函数ST_GeomFromGeoJSON进行转换；而在MySQL中使用GeomFromText函数。

````
// 创建一个点:
var point = { type: 'Point', coordinates: [39.807222,-76.984722]};

User.create({username: 'username', geometry: point }).then(function(newUser) {
...
});

// 创建一个新的线:
var line = { type: 'LineString', 'coordinates': [ [100.0, 0.0], [101.0, 1.0] ] };

User.create({username: 'username', geometry: line }).then(function(newUser) {
...
});

// 创建一个几何:
var polygon = { type: 'Polygon', coordinates: [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                  [100.0, 1.0], [100.0, 0.0] ] 
                ]};

User.create({username: 'username', geometry: polygon }).then(function(newUser) {
...
});

// 使用自定义的 SRID 创建点:
var point = { 
  type: 'Point', 
  coordinates: [39.807222,-76.984722],
  crs: { type: 'name', properties: { name: 'EPSG:4326'} }
};

User.create({username: 'username', geometry: point }).then(function(newUser) {
...
});
````


# GEOGRAPHY

````
GEOGRAPHY()
````

地理类型是一个二维空间对象



<-- [返回](../catalogue.md)