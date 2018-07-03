# 开发文档目录

## 1.定义描述

- [Definition - 模型定义](./definition/definition.md)
- [Data types - 数据类型](./definition/dataType.md)
- [Deferrable - 延时执行](./definition/deferrable.md)
- [Getters & setters - 访问器&设置器](./definition/getSet.md)
- [Validations - 验证](./definition/validations.md)
- [Configuration - 配置](./definition/configuration.md)
- [Import - 模型导入](./definition/import.md)
- [Database synchronization - 数据库同步](./definition/dataSyn.md)
- [Expansion of models - 模型扩展](./definition/expansion.md)

## 2.模型的使用

- [Data retrieval / Finders - 数据索引/查找](./modelUser/finders.md)
- [Eager loading - 预加载](./modelUser/eager.md)

## 3.Model类的API

- [removeAttribute() - 移除属性](./modelAPI/removeAttribute.md)
- [sync() - 同步模型到数据库](./modelAPI/sync.md)
- [drop() - 删除数据库中的表](./modelAPI/drop.md)
- [schema() - 指定schema](./modelAPI/schema.md)
- [getTableName() - 获取表名](./modelAPI/getTableName.md)
- [addScope() - 添加限制范围](./modelAPI/addScope.md)
- [scope() - 应用限制范围](./modelAPI/scope.md)
- [findAll() - 查询多条数据](./modelAPI/findAll.md)
- [findById() - 通过Id查询单条数据](./modelAPI/findById.md)
- [findOne() - 通过单条数据](./modelAPI/findOne.md)
- [aggregate() - 聚合查询](./modelAPI/aggregate.md)
- [count() - 统计查询结果数](./modelAPI/count.md)
- [findAndCount() - 分页查询](./modelAPI/findAndCount.md)
- [max() - 查询最大值](./modelAPI/max.md)
- [min() - 查询最大值](./modelAPI/min.md)
- [sum() - 求和](./modelAPI/sum.md)
- [build() - 创建新实例](./modelAPI/build.md)
- [create() - 创建保存新实例](./modelAPI/create.md)
- [findOrInitialize() - 查找或初始化](./modelAPI/findOrInitialize.md)
- [upsert() - 创建或更新](./modelAPI/upsert.md)
- [bulkCreate() - 创建多条记录](./modelAPI/bulkCreate.md)
- [truncate() - 截断模型](./modelAPI/truncate.md)
- [destroy() - 删除记录](./modelAPI/destroy.md)
- [restore() - 恢复记录](./modelAPI/restore.md)
- [update() - 更新记录](./modelAPI/update.md)
- [describe() - 查询表信息](./modelAPI/describe.md)

## 4.关系/关联的使用

- [一对一(One-To-One)关联](./relate/oneToOne.md)
- [一对多(One-To-Many)关联](./relate/oneToMany.md)
- [多对多(Belongs-To-Many)关联](./relate/belongsToMany.md)
- [Scopes - 作用域](./relate/scopes.md)
- [命名策略](./relate/define.md)
- [关联对象](./relate/relate.md)
- [关系检查](./relate/relation.md)
- [外键](./relate/foreignKey.md)
- [通过关联创建实例](./relate/build.md)

## 5.关系/关联相关的API

- [综合介绍](./relateAPI/intro.md)
- [Model.hasOne() － 拥有一个](./relateAPI/hasOne.md)
- [Model.belongsTo() － 属于](./relateAPI/belongsTo.md)
- [Model.hasMany() － 拥有多个](./relateAPI/hasMany.md)
- [Model.belongsToMany() － 多对多](./relateAPI/belongsToMany.md)

## 6.Model查询

- [Attributes - 属性与查询字段](./modelFind/attr.md)
- [Where - 指定筛选条件](./modelFind/where.md)
- [limit/offset - 分页与限制返回结果数](./modelFind/limit.md)
- [查询排序](./modelFind/find.md)

## 7.原始查询

- [原始查询方法](./origFind/origFind.md)
- [查询参数替换](./origFind/attrReplace.md)
- [参数绑定](./origFind/attrBundle.md)

## 8.数据类型类 datatypes 及其API

- [dataTypes类](./dataType/dataType.md)
- [dataTypes类中的API](./dataType/dataTypeAPI.md)
    - [STRING() - 变长字符串](./dataType/dataTypeAPI.md#string)
    - [CHAR() - 定长字符串](./dataType/dataTypeAPI.md#char)
    - [TEXT() - 指定为文本列](./dataType/dataTypeAPI.md#text)
    - [INTEGER() - 整型](./dataType/dataTypeAPI.md#integer)
    - [BIGINT() - 长整型](./dataType/dataTypeAPI.md#bigint)
    - [FLOAT() - 浮点数](./dataType/dataTypeAPI.md#float)
    - [REAL() - 浮点数](./dataType/dataTypeAPI.md#real)
    - [DOUBLE() - 双精度浮点数](./dataType/dataTypeAPI.md#double)
    - [DECIMAL() - 小数](./dataType/dataTypeAPI.md#decimal)
    - [BOOLEAN() - 布尔](./dataType/dataTypeAPI.md#boolean)
    - [TIME() - 时间类型](./dataType/dataTypeAPI.md#time)
    - [DATE() - 日期时间类型](./dataType/dataTypeAPI.md#date)
    - [DATEONLY() - 日期类型](./dataType/dataTypeAPI.md#dateonly)
    - [HSTORE() - 键/值类型](./dataType/dataTypeAPI.md#hstore)
    - [JSON() - JSON字符串类型](./dataType/dataTypeAPI.md#json)
    - [JSONB() - JSONB类型](./dataType/dataTypeAPI.md#jsonb)
    - [NOW() - 时间默认值](./dataType/dataTypeAPI.md#now)
    - [BLOB() - 二进制类型](./dataType/dataTypeAPI.md#blob)
    - [RANGE() - Range类型](./dataType/dataTypeAPI.md#range)
    - [UUID() - UUID类型](./dataType/dataTypeAPI.md#uuid)
    - [UUIDV1() - UUID v1 默认值](./dataType/dataTypeAPI.md#uuidv1)
    - [UUIDV4() - UUID v4 默认值](./dataType/dataTypeAPI.md#uuidv4)
    - [VIRTUAL() - 虚拟值](./dataType/dataTypeAPI.md#virtual)
    - [ENUM() - 枚举](./dataType/dataTypeAPI.md#enum)
    - [ARRAY() - 数组](./dataType/dataTypeAPI.md#array)
    - [GEOMETRY() - 几何类型](./dataType/dataTypeAPI.md#geometry)
    - [GEOGRAPHY() - 地理类型](./dataType/dataTypeAPI.md#geography)
    
    
    


