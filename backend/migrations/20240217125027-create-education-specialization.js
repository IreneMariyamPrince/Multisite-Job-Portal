/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Education_Specializations', {
      // Updated table name
      eduSpecializationId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eduQualificationId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_Education_Qualifications', // Updated table name
          key: 'eduQualificationId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      specialization: {
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
    await queryInterface.dropTable('mjps_Education_Specializations'); // Updated table name
  },
};
