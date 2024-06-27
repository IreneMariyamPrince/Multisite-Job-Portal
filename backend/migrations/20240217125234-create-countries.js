/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjpsCountries', {
      // Updated table name
      countryId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      countryName: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      countryCode: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneCode: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
      },

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
    await queryInterface.dropTable('mjpsCountries'); // Updated table name
  },
};
