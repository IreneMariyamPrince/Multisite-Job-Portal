/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    'mjps_user_role',
    {
      userRoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userRole: {
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
      tableName: 'mjps_UserRole', // Updated with the "mjps_" prefix
    }
  );

  return UserRoles;
};
