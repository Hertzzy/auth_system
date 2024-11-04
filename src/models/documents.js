'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    static associate(models) {}
  }

  Documents.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.ENUM('1', '2', '3', '4'),
      document_type: DataTypes.ENUM('1', '2', '3'),
      document_cpf: DataTypes.STRING,
      document_rg: DataTypes.STRING,
      upload: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'documents'
    }
  );

  return Documents;
};
