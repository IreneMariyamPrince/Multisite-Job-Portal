/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const UserLog = sequelize.define(
    'mjps_user_log',
    {
      logId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      logType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logDescription: {
        type: DataTypes.STRING,
      },
      logDateTime: {
        type: DataTypes.DATE,
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
      timestamps: false,
      tableName: 'mjps_user_log',
    }
  );

  return UserLog;
};
