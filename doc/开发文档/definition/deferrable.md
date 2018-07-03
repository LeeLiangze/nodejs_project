# Deferrable - 延时执行

当你指定一个可选的外键列，那么可以在PostgreSQL定义为Deferrable类型。以下选项可用：

````
// Defer all foreign key constraint check to the end of a transaction
Sequelize.Deferrable.INITIALLY_DEFERRED

// Immediately check the foreign key constraints
Sequelize.Deferrable.INITIALLY_IMMEDIATE

// Don't defer the checks at all
Sequelize.Deferrable.NOT
````




<-- [返回](../catalogue.md)