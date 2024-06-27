/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Education_Qualifications', {
      // Updated table name
      eduQualificationId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qualification: {
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
    await queryInterface.dropTable('mjps_Education_Qualifications'); // Updated table name
  },
};
