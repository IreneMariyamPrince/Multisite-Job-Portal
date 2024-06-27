/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Users', {
      // Updated table name
      userId: {
        // Updated column name
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      firstName: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mobile: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailVerification: {
        // Updated column name
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mobileVerification: {
        // Updated column name
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userRoleId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_User_Roles', // Updated table name
          key: 'userRoleId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userStatus: {
        // Updated column name
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('mjps_Users'); // Updated table name
  },
};
