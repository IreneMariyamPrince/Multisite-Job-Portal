/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

module.exports = (sequelize, DataTypes) => {
  const RegionalUserInfo = sequelize.define(
    'mjps_regional_user_info',
    {
      regionalUserInfoId: {
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
      gender: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATE,
      },
      logo: {
        type: DataTypes.STRING,
      },
      address1: {
        type: DataTypes.STRING,
      },
      address2: {
        type: DataTypes.STRING,
      },
      pinCode: {
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
      tableName: 'mjps_regional_user_info',
    }
  );

  return RegionalUserInfo;
};
