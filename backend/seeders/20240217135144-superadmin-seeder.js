/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Generate hashed password
      const hashedPassword = await bcrypt.hash('admin', 10); // 10 is the salt rounds

      // Seed super admin user
      await queryInterface.bulkInsert('mjps_users', [
        {
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@mail.com',
          mobile: '1234567890',
          password: hashedPassword, // Store hashed password
          emailVerification: '1',
          mobileVerification: '1',
          userRoleId: 1, // Assuming userRoleId 1 is for the super admin role
          userStatus: '1', //  '1' is the status for active users
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
