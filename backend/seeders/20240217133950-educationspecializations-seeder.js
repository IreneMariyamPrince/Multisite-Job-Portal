/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mjps_Education_Specializations', [
      // Specializations for SSLC
      {
        eduQualificationId: 1,
        specialization: 'Mathematics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 1,
        specialization: 'Science (Physics, Chemistry, Biology)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 1,
        specialization: 'Social Studies (History, Geography, Civics)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 1,
        specialization: 'Language(s) (English, Regional Language)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for BA
      {
        eduQualificationId: 2,
        specialization: 'Literature',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 2,
        specialization: 'History',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 2,
        specialization: 'Philosophy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 2,
        specialization: 'Languages (English, French, Spanish, etc.)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 2,
        specialization: 'Fine Arts (Painting, Sculpture, etc.)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 2,
        specialization: 'Cultural Studies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for BSc
      {
        eduQualificationId: 3,
        specialization: 'Mathematics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 3,
        specialization: 'Physics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 3,
        specialization: 'Chemistry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 3,
        specialization: 'Biology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for MA
      {
        eduQualificationId: 4,
        specialization: 'Advanced Literature',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Advanced History',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Advanced Philosophy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Linguistics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Fine Arts (Advanced)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Anthropology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Political Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 4,
        specialization: 'Economics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for MBA
      {
        eduQualificationId: 5,
        specialization: 'Accounting',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Finance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Human Resource Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Operations Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Business Ethics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 5,
        specialization: 'Strategic Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for MSc
      {
        eduQualificationId: 6,
        specialization: 'Advanced Mathematics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 6,
        specialization: 'Advanced Physics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 6,
        specialization: 'Advanced Chemistry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 6,
        specialization: 'Advanced Biology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for BTech/BE
      {
        eduQualificationId: 7,
        specialization: 'Civil Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Mechanical Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Electrical Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Computer Science and Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Electronics and Communication Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Chemical Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 7,
        specialization: 'Aerospace Engineering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for MBBS
      {
        eduQualificationId: 8,
        specialization: 'Anatomy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Physiology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Biochemistry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Pharmacology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Pathology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Microbiology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 8,
        specialization: 'Community Medicine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for BCom
      {
        eduQualificationId: 9,
        specialization: 'Accounting',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Economics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Business Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Financial Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Taxation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Auditing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 9,
        specialization: 'Business Law',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for BEd
      {
        eduQualificationId: 10,
        specialization: 'Educational Psychology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 10,
        specialization: 'Teaching Methodologies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 10,
        specialization: 'Curriculum Development',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 10,
        specialization: 'Educational Technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 10,
        specialization: 'Classroom Management',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 10,
        specialization: 'Special Education',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Specializations for Diploma/Certificate Programs
      {
        eduQualificationId: 11,
        specialization: 'Information Technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Culinary Arts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Fashion Design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Graphic Design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Web Development',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Nursing Assistant',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eduQualificationId: 11,
        specialization: 'Electrician Training',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more specializations as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all rows from the EducationSpecializations table
    return queryInterface.bulkDelete('mjps_Education_Specializations', null, {});
  },
};
