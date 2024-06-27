/* eslint-env es6 */
const { Sequelize,Op  } = require('sequelize');
const config = require('./config/config.json');
const UserModel = require('./models/Users')
const webSourceModel = require('./models/WebSources')
const RegionalUserInfoModel = require('./models/RegionalUserInfo')
const EmployerInfoModel = require('./models/EmployerInfo')
const candidateInfoModel = require('./models/CandidateInfo')
const educationQualificationModel = require('./models/EducationQualifications')
const educationSpecializationModel = require('./models/EducationSpecializations')
const jobVacancyModel = require('./models/JobVacancyInfo')
const jobApplicationInfoModel = require('./models/JobApplicationInfo')

const dbConfig = config.development

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    timezone: '+05:30', // Adjust according to your timezone
  });


// Define associations or other setup tasks here

const user=UserModel(sequelize,Sequelize)
const regionalUserInfo=RegionalUserInfoModel(sequelize,Sequelize)
const webSources=webSourceModel(sequelize,Sequelize)
const employerInfo=EmployerInfoModel(sequelize,Sequelize)
const candidateInfo=candidateInfoModel(sequelize,Sequelize)
const educationQualificationInfo= educationQualificationModel(sequelize,Sequelize)
const educationSpecializationInfo=educationSpecializationModel(sequelize,Sequelize)
const jobVacancyInfo = jobVacancyModel(sequelize,Sequelize)
const jobApplicationInfo = jobApplicationInfoModel(sequelize, Sequelize)

// Define associations between models
user.hasOne(regionalUserInfo, { foreignKey: 'userId', as: 'RegionalInfo' });
regionalUserInfo.belongsTo(user, { foreignKey: 'userId'});

webSources.hasMany(regionalUserInfo, { foreignKey: 'webSourceId', as:'webSourceInfo'});
regionalUserInfo.belongsTo(webSources,{foreignKey: 'webSourceId'})


user.hasOne(webSources, { foreignKey: 'userId', as: 'WebInfo' });
webSources.belongsTo(user, { foreignKey: 'userId', as:'userInfo' });

user.hasOne(employerInfo,{foreignKey: 'userId', as:'employerInfo' })
employerInfo.belongsTo(user,{foreignKey:'userId'})

user.hasOne(candidateInfo,{foreignKey:'userId', as:'candidateInfo'})
candidateInfo.belongsTo(user,{foreignKey:'userId'})

educationQualificationInfo.hasMany(candidateInfo,{foreignKey:'eduQualificationId'})
candidateInfo.belongsTo(educationQualificationInfo,{foreignKey:'eduQualificationId', as:'qualificationInfo'})

educationSpecializationInfo.hasMany(candidateInfo,{foreignKey:'eduSpecializationId' })
candidateInfo.belongsTo(educationSpecializationInfo,{foreignKey:'eduSpecializationId', as:'specializationInfo' })

educationQualificationInfo.hasMany(educationSpecializationInfo, { foreignKey: 'eduQualificationId' });
educationSpecializationInfo.belongsTo(educationQualificationInfo, { foreignKey: 'eduQualificationId' });

employerInfo.hasMany(jobVacancyInfo,{foreignKey:'jobVacancyInfoId ' })
jobVacancyInfo.belongsTo(employerInfo,{foreignKey:'employerId', as:'employerInfo'})


module.exports =   {
    sequelize,
    Op,
    user,
    regionalUserInfo,
    webSources,
    employerInfo,
    candidateInfo,
    educationQualificationInfo,
    educationSpecializationInfo,
    jobVacancyInfo,
    jobApplicationInfo
    
} 
    
