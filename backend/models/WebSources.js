/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const WebSources = sequelize.define(
    'mjps_web_sources',
    {
      webSourceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      webSourceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      webInfoTheme: {
        type: DataTypes.STRING,
      },
      webInfoWebUrl: {
        type: DataTypes.STRING,
      },
      webInfoTitle: {
        type: DataTypes.STRING,
      },
      webInfoLogo: {
        type: DataTypes.STRING,
      },
      webInfoStatus: {
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
      tableName: 'mjps_web_sources',
    }
  );
  return WebSources;
};
