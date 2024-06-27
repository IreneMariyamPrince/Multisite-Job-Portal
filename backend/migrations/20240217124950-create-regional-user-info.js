/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Regional_User_Info', {
      // Updated table name
      regionalUserInfoId: {
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
      webSourceId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_Web_Sources', // Updated table name
          key: 'webSourceId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      gender: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATE,
      },
      address1: {
        type: Sequelize.STRING,
      },
      address2: {
        type: Sequelize.STRING,
      },
      pinCode: {
        // Updated column name
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('mjps_Regional_User_Info'); // Updated table name
  },
};
