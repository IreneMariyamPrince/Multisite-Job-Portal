/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_web_sources', {
      // Updated table name
      webSourceId: {
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
          model: 'mjps_users', // Updated table name
          key: 'userId', // Updated column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      webSourceName: {
        // Updated column name
        type: Sequelize.STRING,
        allowNull: false,
      },
      webInfoTheme: {
        // Updated column name
        type: Sequelize.STRING,
      },
      webInfoWebUrl: {
        // Updated column name
        type: Sequelize.STRING,
      },
      webInfoTitle: {
        // Updated column name
        type: Sequelize.STRING,
      },
      webInfoLogo: {
        // Updated column name
        type: Sequelize.STRING,
      },
      webInfoStatus: {
        // Updated column name
        type: Sequelize.STRING,
        defaultValue: '1',
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
    await queryInterface.dropTable('mjpsWebSources'); // Updated table name
  },
};
