/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_Candidate_Info', {
      // Updated table name
      candidateInfoId: {
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
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      eduQualificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eduSpecializationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      linkedin: {
        type: Sequelize.STRING,
      },
      git: {
        type: Sequelize.STRING,
      },
      resume: {
        type: Sequelize.STRING,
      },
      relocate: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mjps_Candidate_Info'); // Updated table name
  },
};
