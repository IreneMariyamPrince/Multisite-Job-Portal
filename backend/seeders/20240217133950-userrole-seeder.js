/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mjps_User_Roles', [
      // Updated table name
      { userRole: 'Central', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      { userRole: 'Region', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      { userRole: 'Employer', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      { userRole: 'Candidate', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mjps_User_Roles', null, {}); // Updated table name
  },
};
