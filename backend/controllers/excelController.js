/* eslint-disable no-inner-declarations */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRoles, Avatar, WebSourceStatus, UserStatus } = require('../constants/constants');
const { user, sequelize, regionalUserInfo, webSources,candidateInfo,educationQualificationInfo, educationSpecializationInfo } = require('../sequelize');
const { createTransporter } = require('../transporter/emailService')
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const initMulter = require('../middlewares/multerConfig');
const { exportToExcel } = require('../controllers/exportController')
const { convertUserStatus } = require('../utility/convertStatus')

const subdirectory = 'region';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = initMulter(subdirectory, allowedFileTypes);

const exportHandler = async (req, res) => {
    const route = req.query.route
    switch (route) {
        case 'admin/regions':
            return regionsListExport(req, res)
        case 'admin/regionWebInfo':
            return webInfoExport(req, res)
        case 'admin/candidates':
            return candidateListExport(req, res)
        default:
            return res.json({ success: false, message: 'No Excel' });
    }
}

const regionsListExport = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
    const { searchQuery, filterOption, orderByDate } = req.query;

    try {
        let whereClause = {
            userRoleId: UserRoles.REGION
        };

        if (searchQuery !=='undefined') {
            whereClause[Op.or] = [
                { firstName: { [Op.like]: `%${searchQuery}%` } },
                { lastName: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } }
            ];
        }

        let includeOptions = [
            {
                model: regionalUserInfo,
                required: true,
                attributes: [
                    'gender',
                    'dob',
                    'address1',
                    'address2',
                    'pinCode',
                    'district',
                    'state',
                    'logo'
                ],
                as: 'RegionalInfo'
            },
            {
                model: webSources,
                required: true,
                attributes: [
                    'webSourceName',
                    'webInfoTheme',
                    'webInfoWebUrl',
                    'webInfoTitle',
                    'webInfoStatus'
                ],
                as: 'WebInfo'
            }
        ];

        if (filterOption !== 'undefined') {
            whereClause.userStatus = filterOption;
        }
        const order = [];
        if (orderByDate!=='undefined' && orderByDate === 'asc' || orderByDate!=='undefined' &&orderByDate === 'desc') {
            order.push(['createdAt', orderByDate]);
        }

        // Condition to check if export flag is set to 'excel'
        if (req.query.export === 'excel') {
            const regionData = await user.findAll({
                where: whereClause,
                include: includeOptions,
                attributes: [
                    'userId',
                    'firstName',
                    'lastName',
                    'email',
                    'mobile',
                    'userRoleId',
                    'userStatus',
                    'createdAt',
                    'updatedAt'
                ],
                order: order
            });

            const processedRegionData = regionData.map(row => {
                let modifiedRegionalInfo = { ...row.RegionalInfo.toJSON() };

                if (modifiedRegionalInfo.logo === 'uploads/sample/avatar.jpg') {
                    modifiedRegionalInfo.logo = `${process.env.BASE_URL}/sample/avatar.jpg`;
                } else {
                    modifiedRegionalInfo.logo = `${process.env.BASE_URL}/region/${modifiedRegionalInfo.logo}`;
                }

                return {
                    ...row.toJSON(),
                    RegionalInfo: modifiedRegionalInfo
                };
            });

            // Prepare data for Excel export
            const excelData = processedRegionData.map((row, index) => [
                index + 1,
                row.userId,
                row.firstName,
                row.lastName,
                row.email,
                row.mobile,
                row.userRoleId,
                convertUserStatus(row.userStatus),
                row.createdAt,
                row.updatedAt,
                row.RegionalInfo.gender,
                row.RegionalInfo.dob,
                row.RegionalInfo.address1,
                row.RegionalInfo.address2,
                row.RegionalInfo.pinCode,
                row.RegionalInfo.district,
                row.RegionalInfo.state,
                row.RegionalInfo.logo,
                row.WebInfo.webSourceName,
                row.WebInfo.webInfoTheme,
                row.WebInfo.webInfoWebUrl,
                row.WebInfo.webInfoTitle,
                row.WebInfo.webInfoStatus
            ]);



            // Define headers for Excel
            const excelHeaders = [
                'Serial No',
                'User ID',
                'First Name',
                'Last Name',
                'Email',
                'Mobile',
                'User Role ID',
                'User Status',
                'Created At',
                'Updated At',
                'Gender',
                'DOB',
                'Address 1',
                'Address 2',
                'Pin Code',
                'District',
                'State',
                'Logo',
                'Web Source Name',
                'Web Info Theme',
                'Web Info Web Url',
                'Web Info Title',
                'Web Info Status'
            ];

            // Export data to Excel
            const excelBuffer = await exportToExcel(excelData, excelHeaders, 'Regions');

            // Set headers for the response
            // Set headers for the response
            let filename = `community members.xlsx`;

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            return res.send(excelBuffer);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

const webInfoExport = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
    const { searchQuery, filterOption, orderByDate, themeFilter } = req.query;
    try {
        let whereClause = {
            userRoleId: UserRoles.REGION
        };

        if (searchQuery !== 'undefined') {
            // Construct a dynamic where clause to search across all fields
            whereClause[Op.or] = [
                { firstName: { [Op.like]: `%${searchQuery}%` } },
                { lastName: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
                // Add more fields as needed
            ];
        }

        let includeOptions = [
            {
                model: regionalUserInfo,
                required: true, // Make sure the join is inner join
                attributes: [
                    'logo',
                ],
                as: 'RegionalInfo',
            },
            {
                model: webSources,
                required: true, // Make sure the join is inner join
                attributes: [
                    'webSourceName',
                    'webInfoTheme',
                    'webInfoWebUrl',
                    'webInfoTitle',
                    'webInfoStatus',
                ],
                as: 'WebInfo',
            }
        ];

        if (filterOption !== 'undefined') {
            // Apply filter condition based on webInfoStatus
            includeOptions.push({
                model: webSources,
                required: true, // Make sure the join is inner join
                where: {
                    webInfoStatus: filterOption // Apply filter condition based on the selected filter option
                },
                as: 'WebInfo'
            });
        }
        if (themeFilter !== 'undefined') {
            includeOptions.push({
                model: webSources,
                required: true,
                where: {
                    webInfoTheme: themeFilter
                },
                as: 'WebInfo'
            });
        }

        const order = [];
        if (orderByDate === 'asc' || orderByDate === 'desc') {
            order.push(['createdAt', orderByDate]);
        }

        // Condition to check if export flag is set to 'excel'
        if (req.query.export === 'excel') {

            const regionWebInfo = await user.findAndCountAll({
                where: whereClause,
                include: includeOptions,
                attributes: [
                    'userId',
                    'firstName',
                    'lastName',
                    'email',
                    'mobile',
                ],
                order: order
            });

            const processedRegionData = regionWebInfo.rows.map(row => {
                let modifiedRegionalInfo = { ...row.RegionalInfo.toJSON() };

                // Check if the logo needs modification
                if (modifiedRegionalInfo.logo === 'uploads/sample/avatar.jpg') {
                    modifiedRegionalInfo.logo = `${process.env.BASE_URL}/sample/avatar.jpg`;
                } else {
                    modifiedRegionalInfo.logo = `${process.env.BASE_URL}/region/${modifiedRegionalInfo.logo}`;
                }

                return {
                    ...row.toJSON(),
                    RegionalInfo: modifiedRegionalInfo // Assign the modified RegionalInfo to the new object
                };
            });

            // Prepare data for Excel export
            const excelData = processedRegionData.map((row, index) => [
                index + 1,
                row.userId,
                row.firstName,
                row.lastName,
                row.email,
                row.mobile,
                row.RegionalInfo.logo,
                row.WebInfo.webSourceName,
                row.WebInfo.webInfoTheme,
                row.WebInfo.webInfoWebUrl,
                row.WebInfo.webInfoTitle,
                row.WebInfo.webInfoStatus
            ]);
            // Define headers for Excel
            const excelHeaders = [
                'Serial No',
                'User ID',
                'First Name',
                'Last Name',
                'Email',
                'Mobile',
                'Logo',
                'Web Source Name',
                'Web Info Theme',
                'Web Info Web Url',
                'Web Info Title',
                'Web Info Status'
            ];

            // Export data to Excel
            const excelBuffer = await exportToExcel(excelData, excelHeaders, 'Regions');

            // Set headers for the response
            // Set headers for the response
            let filename = `Region.xlsx`;

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            return res.send(excelBuffer);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

const candidateListExport = async (req, res) => {
    const { searchQuery, filterOption, orderByDate, qualification, specialization } = req.query
    console.log(qualification,'qualification')

    try {
        let whereClause = {
            userRoleId: UserRoles.CANDIDATE
        };
        if (searchQuery !== 'undefined') {
            // Construct a dynamic where clause to search across all fields
            whereClause[Op.or] = [
                { firstName: { [Op.like]: `%${searchQuery}%` } },
                { lastName: { [Op.like]: `%${searchQuery}%` } },
                { email: { [Op.like]: `%${searchQuery}%` } },
                // Add more fields as needed
            ];
        }
        let includeOptions = [
            {
                model: candidateInfo,
                required: true,
                attributes: [
                    'candidateInfoId',
                    'gender',
                    'dob',
                    'address1',
                    'address2',
                    'pinCode',
                    'district',
                    'state',
                    'linkedin',
                    'git',
                    'resume',
                    'pic'
                ],
                as: 'candidateInfo',
                include: [
                    {
                        model: educationQualificationInfo,
                        where: qualification ? { eduQualificationId: qualification } : {},
                        required: true,
                        attributes: ['qualification'],
                        as: 'qualificationInfo'
                    },
                    {
                        model: educationSpecializationInfo,
                        where: specialization ? { eduSpecializationId: specialization } : {},
                        required: true,
                        attributes: ['specialization'],
                        as: 'specializationInfo'
                    }
                ],

            },
        ]
        if (filterOption!=='undefined') {
            whereClause.userStatus = filterOption;
        }
        const order = [];
        if (orderByDate!=='undefined'&& orderByDate === 'asc' || orderByDate!=='undefined'&& orderByDate === 'desc') {
            order.push(['createdAt', orderByDate]);
        }

        const candidateData = await user.findAndCountAll({
            where: whereClause,
            include: includeOptions,
            attributes: [
                'userId',
                'firstName',
                'lastName',
                'email',
                'mobile',
                'userRoleId',
                'userStatus',
                'createdAt'
            ],
            order: order
        })
        const processedCandidateData = candidateData.rows.map(candidate => {
            let modifiedCandidateInfo = { ...candidate.candidateInfo.toJSON() };
            // Check if the logo is 'uploads/sample/avatar.jpg'
            if (candidate.candidateInfo.pic === null) {
                modifiedCandidateInfo.pic = null; // Set logo to 'this' if condition is met
            }
            else if (candidate.candidateInfo.pic === 'uploads/sample/avatar.jpg') {
                modifiedCandidateInfo.pic = `${process.env.BASE_URL}/sample/avatar.jpg`; // Set logo to 'this' if condition is met
            } else {
                modifiedCandidateInfo.pic = `${process.env.BASE_URL}/candidate/${candidate.candidateInfo.pic}`; // Set logo to the processed URL
            }
            if (candidate.candidateInfo.resume === null) {
                modifiedCandidateInfo.resume = null
            }
            else {
                modifiedCandidateInfo.resume = `${process.env.BASE_URL}/candidate/${candidate.candidateInfo.resume}`
            }

            return {
                ...candidate.toJSON(),
                candidateInfo: modifiedCandidateInfo // Assign the modified employerInfo to the new object
            };
        });

        // Prepare data for Excel export
        const excelData = processedCandidateData.map((row, index) => [
            index + 1,
            row.userId,
            row.firstName,
            row.lastName,
            row.email,
            row.mobile,
            row.userStatus,
            row.candidateInfo.gender,
            row.candidateInfo.dob,
            row.candidateInfo.address1,
            row.candidateInfo.address2,
            row.candidateInfo.pinCode,
            row.candidateInfo.district,
            row.candidateInfo.state,
            row.candidateInfo.linkedin,
            row.candidateInfo.git,
            row.candidateInfo.district,
            row.candidateInfo.qualificationInfo.qualification,
            row.candidateInfo.specializationInfo.specialization,

        ]);
        // Define headers for Excel
        const excelHeaders = [
            'Serial No',
            'User ID',
            'First Name',
            'Last Name',
            'Email',
            'Mobile',
            'UserStatus',
            'Gender',
            'DOB',
            'address1',
            'address2',
            'pinCode',
            'district',
            'state',
            'linkedin',
            'git',
            'qualification',
            'specialization'
        ];

        // Export data to Excel
        const excelBuffer = await exportToExcel(excelData, excelHeaders, 'Regions');

        // Set headers for the response
        // Set headers for the response
        let filename = `Region.xlsx`;

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=" + filename);
        return res.send(excelBuffer);
        // return res.json({processedCandidateData})

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};



module.exports = { exportHandler }