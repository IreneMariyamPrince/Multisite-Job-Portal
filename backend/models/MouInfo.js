/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const MouInfo = sequelize.define(
    'mjps_mou_info',
    {
      mouInfoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      regionalUserInfoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mouDoc: {
        type: DataTypes.STRING,
      },
      mouStatus: {
        type: DataTypes.STRING,
      },
      agreementDate: {
        type: DataTypes.DATE,
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
      timestamps: false,
      tableName: 'mjps_mou_info',
    }
  );

  return MouInfo;
};
