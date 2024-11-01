'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.belongsToMany(models.users, { 
        through: 'users_roles', 
        foreignKey: 'role_id' 
      });
    }
  }
  roles.init({
    role_name: {
      type: DataTypes.ENUM("admin", "user"), 
      defaultValue: "user", 
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};