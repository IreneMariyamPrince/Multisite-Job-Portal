/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const regionalController = require('../controllers/center/regionalController');
const webInfoController = require('../controllers/center/webInfoController');
const employerController = require('../controllers/center/employerController');
const adminDashboardController = require('../controllers/center/adminDashboardController');
const candidateController = require('../controllers/center/candidateController');
const educationController = require('../controllers/center/educationController');
const excelController = require('../controllers/excelController') 
const jobController = require('../controllers/center/jobController')


// Root path
router.get('/', (req, res) => {
  res.send('API start');
});

//Admin
router.get('/adminDashboard', adminDashboardController.dashboardData)

// Authentication route
router.post('/login', authController.login);
router.post('/password/reset', authController.passwordResetConfirm)


//Region 
router.get('/region/webInfo',regionalController. regionWebInfo);
router.post('/webinfo/register',webInfoController.webInfoRegister);
router.post('/webinfo/decline',webInfoController.webInfoDecline)
router.get('/regions', regionalController.regionsList);
router.post('/region/register', regionalController.regionRegister);
router.post('/region/approve', regionalController.regionApprove )
router.delete('/region/delete', regionalController.regionDelete)

//Employer
router.get('/employers/',employerController.employerList)
router.post('/employer/register',employerController.employerCreate)
router.delete('/employer/delete',employerController.employerDelete)

//Candidate
router.get('/candidateList', candidateController.candidateList)
router.post('/candidate/register',candidateController.candidateRegister)
router.delete('/candidate/delete',candidateController.candidateDelete)

//Education
router.get('/qualification',educationController.qualificationList)
router.get('/specialization',educationController.specializationList)

//Job
router.get('/jobvacancy',jobController.jobVacancyList)
router.post('/jobvacancy/register',jobController.jobVacancyRegister )
router.delete('/jobvacancy/delete',jobController.jobVacancyDelete)
router.post('/jobapplication/register', jobController.jobApplicationRegister )


// Export
router.post('/excel/export', excelController.exportHandler )

module.exports = router;
