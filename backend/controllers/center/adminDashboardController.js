/* eslint-disable no-undef */
const { Op } = require('sequelize');
const { UserRoles, UserStatus } = require('../../constants/constants');
const { user, sequelize } = require('../../sequelize');

const fetchDataByUserRole = async (userRoleId, fromDate, toDate) => {
  const counts = await user.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
      [sequelize.fn('COUNT', sequelize.col('userId')), 'count'],
    ],
    where: {
      userRoleId,
      createdAt: {
        [Op.between]: [fromDate, toDate],
      },
    },
    group: [sequelize.fn('DAYOFWEEK', sequelize.col('createdAt')), 'date'], // Include 'date' in group for correct grouping
  });

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const countsByDay = {};

  // Initialize counts for each weekday
  weekdays.forEach(day => {
    countsByDay[day] = { date: null, dayName: day, count: 0 };
  });

  // Aggregate counts for each weekday
  counts.forEach(row => {
    const date = row.get('date');
    const dayOfWeek = new Date(date).getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayName = weekdays[dayOfWeek]; // Get the name of the day of the week
    const count = row.get('count');
    countsByDay[dayName].date = date;
    countsByDay[dayName].count += count;
  });

  // Convert countsByDay object to array
  const previousWeekCounts = Object.values(countsByDay);

  return previousWeekCounts;
};

const dashboardData = async (req, res) => {
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
    const regionCountPreviousWeek = await user.count({
      where: {
        userRoleId: UserRoles.REGION,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDatePreviousWeek, toDatePreviousWeek],
        },
      },
    });
    const employerCountPreviousWeek = await user.count({
      where: {
        userRoleId: UserRoles.EMPLOYER,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDatePreviousWeek, toDatePreviousWeek],
        },
      },
    });
    const candidateCountPreviousWeek = await user.count({
      where: {
        userRoleId: UserRoles.CANDIDATE,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDatePreviousWeek, toDatePreviousWeek],
        },
      },
    });

    // Get total count of users with ACTIVE status
    const regionActiveUsers = await user.count({
      where: { userStatus: UserStatus.ACTIVE, userRoleId: UserRoles.REGION },
    });
    const employerActiveUsers = await user.count({
      where: { userStatus: UserStatus.ACTIVE, userRoleId: UserRoles.EMPLOYER },
    });
    const candidateActiveUsers = await user.count({
      where: { userStatus: UserStatus.ACTIVE, userRoleId: UserRoles.CANDIDATE },
    });

    // Get the date range for the current week
    const fromDateCurrentWeek = new Date();
    fromDateCurrentWeek.setDate(fromDateCurrentWeek.getDate() - fromDateCurrentWeek.getDay()); // Adjust for Sunday as 0
    const toDateCurrentWeek = new Date();

    // Get counts for each user role for the current week
    const regionCountCurrentWeek = await user.count({
      where: {
        userRoleId: UserRoles.REGION,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDateCurrentWeek, toDateCurrentWeek],
        },
      },
    });
    const employerCountCurrentWeek = await user.count({
      where: {
        userRoleId: UserRoles.EMPLOYER,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDateCurrentWeek, toDateCurrentWeek],
        },
      },
    });
    const candidateCountCurrentWeek = await user.count({
      where: {
        userRoleId: UserRoles.CANDIDATE,
        userStatus: UserStatus.ACTIVE,
        createdAt: {
          [Op.between]: [fromDateCurrentWeek, toDateCurrentWeek],
        },
      },
    });

    // Calculate percentage increase for each user role count
    const regionCountIncrease =
      regionCountPreviousWeek === 0
        ? 0
        : parseFloat(
            ((regionCountCurrentWeek - regionCountPreviousWeek) / regionCountPreviousWeek) * 100
          ).toFixed(2);

    const employerCountIncrease =
      employerCountPreviousWeek === 0
        ? 0
        : parseFloat(
            ((employerCountCurrentWeek - employerCountPreviousWeek) / employerCountPreviousWeek) *
              100
          ).toFixed(2);
    const candidateCountIncrease =
      candidateCountPreviousWeek === 0
        ? 0
        : parseFloat(
            ((candidateCountCurrentWeek - candidateCountPreviousWeek) /
              candidateCountPreviousWeek) *
              100
          ).toFixed(2);

    // Fetch data for chart
    const previousWeekCountsRegion = await fetchDataByUserRole(
      UserRoles.REGION,
      fromDateCurrentWeek,
      toDateCurrentWeek
    );
    const previousWeekCountsEmployer = await fetchDataByUserRole(
      UserRoles.EMPLOYER,
      fromDateCurrentWeek,
      toDateCurrentWeek
    );
    const previousWeekCountsCandidate = await fetchDataByUserRole(
      UserRoles.CANDIDATE,
      fromDateCurrentWeek,
      toDateCurrentWeek
    );

    // Response
    return res.status(200).json({
      count: {
        regionActiveUsers,
        employerActiveUsers,
        candidateActiveUsers,
        // regionCountPreviousWeek,
        // regionCountCurrentWeek,
        employerCountPreviousWeek,
        employerCountCurrentWeek,
        // candidateCountPreviousWeek,
        // candidateCountCurrentWeek,
      },
      percentageDifference: {
        regionCount: regionCountIncrease,
        employerCount: employerCountIncrease,
        candidateCount: candidateCountIncrease,
      },
      chartData: {
        previousWeekCountsRegion,
        previousWeekCountsEmployer,
        previousWeekCountsCandidate,
        fromDate: fromDatePreviousWeek,
        toDate: toDatePreviousWeek,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { dashboardData };
