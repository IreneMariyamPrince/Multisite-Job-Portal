/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed super admin user
      await queryInterface.bulkInsert('mjps_employer_info', [
        {
          employerId: 1,
          userId: 1,
          webSourceId: 1,
          name: 'adminCompany',
          logo: 'uploads/sample/avatar.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error seeding super admin user:', error);
      // Throw the error to halt the migration process
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all rows from the mjps_users table
    await queryInterface.bulkDelete('mjps_Users', null, {});
  },
};
