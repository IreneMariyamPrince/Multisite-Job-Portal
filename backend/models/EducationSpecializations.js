// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const EducationSpecializations = sequelize.define(
    'mjps_education_specializations',
    {
      eduSpecializationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eduQualificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialization: {
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
      tableName: 'mjps_education_specializations',
    }
  );

  return EducationSpecializations;
};
