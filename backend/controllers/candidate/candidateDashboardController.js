/* eslint-disable no-undef */
const { Op } = require('sequelize');
const {
  UserRoles,
  UserStatus,
  JobApprovalStatus,
  JobVacancyStatus,
} = require('../../constants/constants');
const { user, jobApplicationInfo, jobVacancyInfo,candidateInfo } = require('../../sequelize');

const dashboardData = async (req, res) => {
  const userId = req.userId;
  try {
    const fromDatePreviousWeek = new Date();
    fromDatePreviousWeek.setDate(
      fromDatePreviousWeek.getDate() - fromDatePreviousWeek.getDay() - 7 // Adjust for Sunday as 0
    );
    fromDatePreviousWeek.setUTCHours(0, 0, 0, 0); // Set time to 12:00 AM

    const toDatePreviousWeek = new Date();
    toDatePreviousWeek.setDate(
      toDatePreviousWeek.getDate() - toDatePreviousWeek.getDay() // Adjust for end of previous week
    );
    toDatePreviousWeek.setUTCHours(23, 59, 59, 999); // Set time to 11:59:59.999 PM

    const candidateData = await candidateInfo.findOne({ where: { userId: userId } });

    // Get total count of applied jon
    const totalJobsAvailable = await jobVacancyInfo.count({
      where: {
        jobApprovalStatus: JobApprovalStatus.APPROVE,
        activeStatus: JobVacancyStatus.ACTIVE,
      },
    });
    const totalAppliedJobs = await jobApplicationInfo.count({
      where: {
        candidateId: candidateData.candidateInfoId,
      },
    });

    // Response
    return res.status(200).json({
      count: {
        // fromDatePreviousWeek,
        // toDatePreviousWeek,
        totalJobsAvailable,
        totalAppliedJobs
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { dashboardData };
