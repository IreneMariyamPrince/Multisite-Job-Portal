/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_User_Logs', {
      // Updated table name
      logId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_Users', // Updated table name
          key: 'userId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      logType: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      logDescription: {
        // Updated column name
        type: Sequelize.STRING,
      },
      logDateTime: {
        // Updated column name
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('mjps_User_Logs'); // Updated table name
  },
};
