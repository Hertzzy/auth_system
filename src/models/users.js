'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsToMany(models.roles, { 
        through: 'users_roles', 
        foreignKey: 'user_id' 
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    status: DataTypes.ENUM("active", "inactive", "blocked")
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
