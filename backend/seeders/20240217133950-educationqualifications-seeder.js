/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mjps_Education_Qualifications', [
      // Updated table name
      {
        qualification: 'SSLC (Secondary School Leaving Certificate) / High School Diploma',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      { qualification: 'BA (Bachelor of Arts)', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      { qualification: 'BSc (Bachelor of Science)', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      { qualification: 'MA (Master of Arts)', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      {
        qualification: 'MBA (Master of Business Administration)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      { qualification: 'MSc (Master of Science)', createdAt: new Date(), updatedAt: new Date() }, // Updated column names
      {
        qualification: 'BTech/BE (Bachelor of Technology/Bachelor of Engineering)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      {
        qualification: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      {
        qualification: 'BCom (Bachelor of Commerce)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      {
        qualification: 'BEd (Bachelor of Education)',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
      {
        qualification: 'Diploma/Certificate Programs',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, // Updated column names
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mjps_Education_Qualifications', null, {}); // Updated table name
  },
};
