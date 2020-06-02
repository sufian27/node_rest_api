'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'declined', 'completed']
    },
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
    // user_id: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    // associations can be defined here

    Project.hasMany(models.Task, {
      foreignKey: 'project_id',
      as: 'tasks',
      onDelete: 'CASCADE'
    })

    // Project.belongsTo(models.Users, {
    //   foreignKey: 'user_id',
    //   as: 'assigner',
    //   onDelete: 'CASCADE'
    // })
  };
  return Project;
};