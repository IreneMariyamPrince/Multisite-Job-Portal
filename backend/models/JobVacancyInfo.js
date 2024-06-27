/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const JobVacancyInfo = sequelize.define(
    'mjps_job_vacancy_info',
    {
      jobVacancyInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      webSourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDomain: {
        type: DataTypes.STRING,
      },
      jobType: {
        type: DataTypes.STRING,
      },
      jobVacancyExperience: {
        type: DataTypes.FLOAT,
      },
      jobDescription: {
        type: DataTypes.TEXT,
      },
      jobLocation: {
        type: DataTypes.STRING,
      },
      jobShift: {
        type: DataTypes.STRING,
      },
      jobSalaryScale: {
        type: DataTypes.STRING,
      },
      jobSkillsReq: {
        type: DataTypes.TEXT,
      },
      jobApprovalStatus: {
        type: DataTypes.STRING,
      },
      activeStatus: {
        type: DataTypes.BOOLEAN,
      },
      expiryDate: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: 'mjps_job_vacancy_info',
    }
  );

  return JobVacancyInfo;
};
