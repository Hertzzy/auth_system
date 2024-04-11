'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_roles extends Model {
    static associate(models) {
      users_roles.belongsTo(models.users, { 
        foreignKey: 'user_id' 
      });
      users_roles.belongsTo(models.roles, { 
        foreignKey: 'role_id' 
      });
    }
  }
  users_roles.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_roles',
  });
  return users_roles;
};