/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const EmployerInfo = sequelize.define(
    'mjps_employer_info',
    {
      employerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      webSourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sector: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
      websiteUrl: {
        type: DataTypes.STRING,
      },
      contactPerson: {
        type: DataTypes.STRING,
      },
      contactPersonDesignation: {
        type: DataTypes.STRING,
      },
      contactPersonMobile: {
        type: DataTypes.STRING,
      },
      address1: {
        type: DataTypes.STRING,
      },
      address2: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      state: {
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
      timestamps: true,
      tableName: 'mjps_employer_info',
    }
  );

  return EmployerInfo;
};
