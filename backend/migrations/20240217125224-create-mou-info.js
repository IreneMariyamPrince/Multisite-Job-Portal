/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Mou_Info', {
      // Updated table name
      mouInfoId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      regionalUserInfoId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_Regional_User_Info', // Updated table name
          key: 'regionalUserInfoId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      mouDoc: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      mouStatus: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      agreementDate: {
        // Updated column name
        type: Sequelize.DATE,
        allowNull: false,
      },
      expiryDate: {
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
    await queryInterface.dropTable('mjps_Mou_Info'); // Updated table name
  },
};
