'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'declined', 'completed']
    },
    // user_id: DataTypes.INTEGER,
    // project_id: DataTypes.INTEGER,
    task_id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'assignee_id',
      as: 'assignee',
      onDelete: 'CASCADE'
    });
    Task.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'assigner',
      onDelete: 'CASCADE'
    });
  };
  return Task;
};