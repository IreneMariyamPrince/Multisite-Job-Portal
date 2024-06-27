/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const EducationQualifications = sequelize.define(
    'mjps_education_qualifications',
    {
      eduQualificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      qualification: {
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
      timestamps: true,
      tableName: 'mjps_education_qualifications',
    }
  );

  return EducationQualifications;
};
