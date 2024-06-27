/* eslint-disable no-inner-declarations *//* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRoles, Avatar, WebSourceStatus, UserStatus, JobVacancyStatus, JobApprovalStatus } = require('../../constants/constants');
const { jobVacancyInfo, webSources, employerInfo, jobApplicationInfo } = require('../../sequelize');
const { createTransporter } = require('../../transporter/emailService')
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const initMulter = require('../../middlewares/multerConfig');
const { exportToExcel } = require('../exportController')
const { convertUserStatus } = require('../../utility/convertStatus')

const subdirectory = 'region';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = initMulter(subdirectory, allowedFileTypes);

const jobVacancyList = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const { searchQuery, jobShift, orderByDate } = req.query;

    try {
        let whereClause = {};
        if (searchQuery) {
            whereClause[Op.or] = [
                { jobTitle: { [Op.like]: `%${searchQuery}%` } },
                { jobDomain: { [Op.like]: `%${searchQuery}%` } },
                { jobType: { [Op.like]: `%${searchQuery}%` } }
            ];
        }
        let includeOptions = [
            {
                model: employerInfo,
                required: true,
                attributes: [
                    'name',
                    'sector',
                    'logo'
                ],
                as: 'employerInfo'
            },
        ];
        if (jobShift) {
            whereClause.jobShift = jobShift
        }
        const order = [];
        if (orderByDate === 'asc' || orderByDate === 'desc') {
            order.push(['createdAt', orderByDate]);
        }

        //counts
        const totalJobs = await jobVacancyInfo.count()
        const totalJobsApprove = await jobVacancyInfo.count({ where: { activeStatus: JobApprovalStatus.APPROVE } })
        const totalJobsPending = await jobVacancyInfo.count({ where: { activeStatus: JobApprovalStatus.PENDING } })
        const totalJobsDecline = await jobVacancyInfo.count({ where: { activeStatus: JobApprovalStatus.DECLINE } })


        // If export flag is not set to 'excel', continue with pagination
        const jobVacancyData = await jobVacancyInfo.findAndCountAll({
            where: whereClause,
            include: includeOptions,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            attributes: [
                'jobVacancyInfoId',
                'employerId',
                'webSourceId',
                'jobTitle',
                'jobDomain',
                'jobType',
                'jobVacancyExperience',
                'jobVacancyExperience',
                'jobDescription',
                'jobLocation',
                'jobShift',
                'jobSalaryScale',
                'jobSkillsReq',
                'jobApprovalStatus',
                'expiryDate',
                'activeStatus',
                'createdAt',
            ],
            order: order
        });

        const processedRegionData = jobVacancyData.rows.map(row => {
            let modifiedRegionalInfo = { ...row.employerInfo.toJSON() };

            // Check if the logo needs modification
            if (modifiedRegionalInfo.logo === 'uploads/sample/avatar.jpg') {
                modifiedRegionalInfo.logo = `${process.env.BASE_URL}/sample/avatar.jpg`;
            } else {
                modifiedRegionalInfo.logo = `${process.env.BASE_URL}/employer/${modifiedRegionalInfo.logo}`;
            }

            return {
                ...row.toJSON(),
                employerInfo: modifiedRegionalInfo // Assign the modified RegionalInfo to the new object
            };
        });

        const totalPages = Math.ceil(jobVacancyData.count / pageSize);

        return res.status(200).json({ counts: { count: jobVacancyData.count, totalJobs: totalJobs, totalJobsApprove: totalJobsApprove, totalJobsPending: totalJobsPending, totalJobsDecline: totalJobsDecline }, data: processedRegionData, totalPages: totalPages });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

const jobVacancyRegister = async (req, res) => {
    const { jobTitle, jobDomain, jobType, jobVacancyExperience, jobDescription, jobLocation, jobShift, jobSalaryScale, jobSkillsReq, expiryDate, webInfoWebUrl } = req.body
    const { hostname } = new URL(webInfoWebUrl);
    const webSourceInfo = await webSources.findOne({ where: { webInfoWebUrl: hostname } });

    if (!webSourceInfo) {
        return res.status(400).json({ error: 'Webinfo record not found for the provided URL' });
    }
    try {
        const jobVacancy = await jobVacancyInfo.create({
            employerId: UserRoles.ADMIN,
            webSourceId: webSourceInfo.webSourceId,
            jobTitle,
            jobDomain,
            jobType,
            jobVacancyExperience,
            jobDescription,
            jobLocation,
            jobShift,
            jobSalaryScale,
            jobSkillsReq,
            jobApprovalStatus: JobApprovalStatus.PENDING,
            expiryDate,
            activeStatus: JobVacancyStatus.PENDING
        })
        return res.status(200).json({ message: jobVacancy })
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ error: 'Internal server error' })
    }
};

const jobVacancyDelete = async (req, res) => {
    const { jobVacancyInfoId } = req.body
    if (!jobVacancyInfoId) {
        return res.status(400).json({ message: 'JobVacancy ID Required' })
    }
    try {
        jobVacancyInfo.destroy({ where: { jobVacancyInfoId: jobVacancyInfoId } })
        return res.status(200).json({ msg: "Job Successfully Deleted" })
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

const jobApplicationRegister = async (req, res) => {
    const { jobVacancyInfoId, regionalUserInfoId, candidateId } = req.body
    
    const existingApplication = await jobApplicationInfo.findOne({
        where: {
            candidateId: candidateId,
            jobVacancyInfoId: jobVacancyInfoId
        }
    });
    console.log(candidateId,'Hello')
    // If the candidate has already applied, return a 400 status code with an error message
    if (existingApplication) {
        return res.status(400).json({ message: 'Already Applied' });
    }

   
    try {
        await jobApplicationInfo.create({
            jobVacancyInfoId: jobVacancyInfoId,
            regionalUserInfoId: regionalUserInfoId,
            candidateId: candidateId,
        })
        return res.status(200).json({ success: true, message: 'Job Application Submitted' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
module.exports = { jobVacancyRegister, jobVacancyList, jobVacancyDelete, jobApplicationRegister }