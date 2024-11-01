'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
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

    // Inserir os dados iniciais na tabela 'roles'
    await queryInterface.bulkInsert('roles', [
      {
        role_name: 'admin',
        description: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'user',
        description: 'Usuário comum',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
