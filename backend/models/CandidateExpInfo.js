/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const CandidateExpInfo = sequelize.define(
    'mjps_candidate_exp_info',
    {
      candidateExpInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      candidateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalYearOfExperience: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
      },
      jobStartDate: {
        type: DataTypes.DATE,
      },
      jobEndDate: {
        type: DataTypes.DATE,
      },
      noticePeriod: {
        type: DataTypes.INTEGER,
      },
      expCertificate: {
        type: DataTypes.STRING,
      },
      jobStatus: {
        type: DataTypes.STRING,
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
      timestamps: false,
      tableName: 'mjps_candidate_exp_info',
    }
  );

  return CandidateExpInfo;
};
