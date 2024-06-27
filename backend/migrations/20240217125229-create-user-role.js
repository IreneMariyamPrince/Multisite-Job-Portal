/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_User_Roles', {
      // Updated table name
      userRoleId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userRole: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Add other columns here based on your schema
      createdAt: {
        // Updated column name
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        // Updated column name
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mjps_User_Roles'); // Updated table name
  },
};
