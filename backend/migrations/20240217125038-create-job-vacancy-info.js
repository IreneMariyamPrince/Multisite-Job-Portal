'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mjps_job_vacancy_info', {
      jobVacancyInfoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employerId: {
        // Updated column name
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mjps_employer_info',
          key: 'employerId',
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
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobDomain: {
        type: Sequelize.STRING,
      },
      jobType: {
        type: Sequelize.STRING,
      },
      jobVacancyExperience: {
        type: Sequelize.FLOAT,
      },
      jobDescription: {
        type: Sequelize.TEXT,
      },
      jobLocation: {
        type: Sequelize.STRING,
      },
      jobShift: {
        type: Sequelize.STRING,
      },
      jobSalaryScale: {
        type: Sequelize.STRING,
      },
      jobSkillsReq: {
        type: Sequelize.TEXT,
      },
      jobApprovalStatus: {
        type: Sequelize.STRING,
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
      },
      expiryDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('mjps_job_vacancy_info');
  },
};
