'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        //1 -> Cadastrado | 2 -> Em aprovação | 3 -> Aprovado | 4 ->Finalizado
        type: Sequelize.ENUM('1', '2', ' 3', '4'),
        defaultValue: '1',
        allowNull: false
      },
      document_type: {
        //1 -> Prontuário | 2 -> Processo | 3 -> Outros
        type: Sequelize.ENUM('1', '2', '3'),
        allowNull: false
      },
      document_cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      document_rg: {
        type: Sequelize.STRING,
        allowNull: false
      },
      obs: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      upload: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documents');
  }
};
