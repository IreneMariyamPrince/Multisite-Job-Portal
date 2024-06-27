/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const CountryState = sequelize.define(
    'mjps_country_state',
    {
      stateId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stateName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateCode: {
        type: DataTypes.STRING,
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
      tableName: 'mjps_country_state',
    }
  );

  return CountryState;
};
