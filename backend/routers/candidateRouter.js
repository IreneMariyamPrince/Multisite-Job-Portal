/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require('express');
const candidateRouter = express.Router();
const candidateInfoController = require('../controllers/candidate/candidateInfoController')
const candidateDashboardController = require('../controllers/candidate/candidateDashboardController')

//middleware
const candidateAuth = require('../middlewares/candidateAuth')


//User-Candidate
candidateRouter.get('/',candidateAuth,candidateInfoController.candidatePersonalInfo )
candidateRouter.get('/dashboard',candidateAuth,candidateDashboardController.dashboardData)

module.exports = candidateRouter