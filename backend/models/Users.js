/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'mjps_users',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      mobileVerification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userStatus: {
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
      tableName: 'mjps_users',
      timestamps: true,
    }
  );
  return Users; // Return the User model
};
