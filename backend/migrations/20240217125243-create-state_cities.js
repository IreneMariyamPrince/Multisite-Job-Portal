/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjpsStateCities', {
      // Updated table name
      cityId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cityName: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjpsCountryStates', // Updated table name
          key: 'stateId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('mjpsStateCities');
  },
};
