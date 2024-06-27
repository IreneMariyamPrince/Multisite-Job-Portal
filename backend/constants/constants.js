/* eslint-env es6 */
  
  const UserRoles = {
    ADMIN: 1,
    REGION: 2,
    EMPLOYER: 3,
    CANDIDATE:4,
  };

  const UserStatus = {
    ACTIVE : 1,
    PENDING : 2
  }

  const Avatar={
    PATH:'uploads/sample/avatar.jpg'
  }

  const WebSourceStatus={
    ACTIVE : 1,
    MAIL_SENT : 2,
    IN_PROGRESS : 3,
    PENDING : 4,
    DECLINE : 5

  }

  const JobVacancyStatus ={
    ACTIVE :1,
    PENDING:2,
    EXPIRED:3
  }

  const JobApprovalStatus={
    APPROVE : 1,
    PENDING : 2,
    DECLINE : 3
  }
  
  module.exports = {
     UserRoles,
     UserStatus,
     Avatar,
     WebSourceStatus,
     JobVacancyStatus,
     JobApprovalStatus
  };