/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const StateCity = sequelize.define(
    'mjps_state_city',
    {
      cityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER, // Assuming you have a Country model
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
      tableName: 'mjps_state_city',
    }
  );

  return StateCity;
};
