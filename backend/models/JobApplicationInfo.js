/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const JobApplicationInfo = sequelize.define(
    'mjps_job_application_info',
    {
      jobApplicationInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      jobVacancyInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regionalUserInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      candidateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'mjps_job_application_info',
    }
  );

  return JobApplicationInfo;
};
