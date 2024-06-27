// eslint-disable-next-line no-undef
module.exports = (sequelize, DataTypes) => {
  const CandidateInfo = sequelize.define(
    'mjps_candidate_info',
    {
      candidateInfoId: {
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
      eduQualificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eduSpecializationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      linkedin: {
        type: DataTypes.STRING,
      },
      git: {
        type: DataTypes.STRING,
      },
      resume: {
        type: DataTypes.STRING,
      },
      pic: {
        type: DataTypes.STRING,
      },
      relocate: {
        type: DataTypes.BOOLEAN,
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
      tableName: 'mjps_candidate_info',
    }
  );

  return CandidateInfo;
};
