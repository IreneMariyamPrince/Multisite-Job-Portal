/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { UserRoles, Avatar, WebSourceStatus, UserStatus } = require('../../constants/constants');
const { user, sequelize, regionalUserInfo, webSources, candidateInfo, educationQualificationInfo, educationSpecializationInfo } = require('../../sequelize');
const { createTransporter } = require('../../transporter/emailService')
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const initMulter = require('../../middlewares/multerConfig');
const subdirectory = 'candidate';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
const upload = initMulter(subdirectory, allowedFileTypes);



const candidateList = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
    const { searchQuery, filterOption, orderByDate,qualification, specialization } = req.query;
    try {
        let whereClause = {
            userRoleId: UserRoles.CANDIDATE
        };
        if (searchQuery) {
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
        if (filterOption) {
            whereClause.userStatus = filterOption;
        }
        const order = [];
        if (orderByDate === 'asc' || orderByDate === 'desc') {
            order.push(['createdAt', orderByDate]);
        }

        const candidateData = await user.findAndCountAll({
            where: whereClause,
            include: includeOptions,
            offset: (page - 1) * pageSize, // Calculate offset based on page number
            limit: pageSize,

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
            if(candidate.candidateInfo.pic === null){
                modifiedCandidateInfo.pic = null; // Set logo to 'this' if condition is met
            }
            else if (candidate.candidateInfo.pic === 'uploads/sample/avatar.jpg') {
                modifiedCandidateInfo.pic = `${process.env.BASE_URL}/sample/avatar.jpg`; // Set logo to 'this' if condition is met
            } else {
                modifiedCandidateInfo.pic = `${process.env.BASE_URL}/candidate/${candidate.candidateInfo.pic}`; // Set logo to the processed URL
            }
            if(candidate.candidateInfo.resume === null){
                modifiedCandidateInfo.resume = null
            }
            else{
                modifiedCandidateInfo.resume = `${process.env.BASE_URL}/candidate/${candidate.candidateInfo.resume}`
            }
            
            return {
                ...candidate.toJSON(),
                candidateInfo: modifiedCandidateInfo // Assign the modified employerInfo to the new object
            };
        });

        const totalPages = Math.ceil(candidateData.count / pageSize);

        return res.status(200).json({
            count: candidateData.count,
            data: processedCandidateData,
            totalPages

        })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", msg: error })
    }
}


const candidateRegister = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: err });
            } else if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const { firstName, lastName, gender, email, mobile, webInfoWebUrl, eduQualificationId, eduSpecializationId } = req.body;

            if (!firstName || !lastName || !gender || !email || !mobile || !webInfoWebUrl) {
                return res.status(400).json({ error: 'Fill out all mandatory fields' });
            }

            let picPath = Avatar.PATH;
            let resumePath = null

            if (req.files['pic']) {
                picPath = req.files['pic'][0].filename;
            }

            if (req.files['resume']) {
                resumePath = req.files['resume'][0].filename;
            }


            const password = await bcrypt.hash('default', 10);

            const { hostname } = new URL(webInfoWebUrl);
            const webSourceInfo = await webSources.findOne({ where: { webInfoWebUrl: hostname } });

            if (!webSourceInfo) {
                return res.status(400).json({ error: 'Webinfo record not found for the provided URL' });
            }

            const existingUser = await user.findOne({ where: { [Op.or]: [{ email }, { mobile }] } });

            if (existingUser) {
                return res.status(400).json({ error: 'Mobile or Email already exists' });
            }

            const userInfo = await user.create({
                firstName,
                lastName,
                email,
                mobile,
                password: password,
                emailVerification: '2',
                mobileVerification: '2',
                userRoleId: UserRoles.CANDIDATE,
                userStatus: UserStatus.PENDING,
            });

            await candidateInfo.create({
                userId: userInfo.userId,
                webSourceId: webSourceInfo.webSourceId,
                gender,
                pic: picPath,
                resume: resumePath,
                eduQualificationId,
                eduSpecializationId,
            });

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const transporter = createTransporter()
            const passwordSet = `${process.env.BASE_FRONTEND_URL}reset-password?token=${token}`;
            // Send email
            await transporter.sendMail({
                from: process.env.EMAIL_SENDER,
                to: email,
                subject: 'Welcome to MJPS',
                html: `Click <a href="${passwordSet}">here</a> to reset your password. This link is valid for 1 hour.`,
            });
            return res.status(200).json({ success: 'Please check your email and complete the registration.' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const candidateDelete = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(400).json({ message: 'User Id Required' })
    }
    if (userId === 1) {
        return res.status(403).json({ message: 'Deleting user ID 1 is not allowed' });
    }
    try {
        const candidate = await user.findOne({ where: { userId: userId, userRoleId: UserRoles.CANDIDATE } });
        if (candidate === null) {
            return res.status(404).json({ message: 'No permission to access this user' })
        }
        await user.destroy({ where: { userId: userId } })
        await candidateInfo.destroy({ where: { userId: userId } })
        return res.json({
            success: true,
            message: 'Candidate Successfully Deleted '
        })

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', msg: error })
    }
}



module.exports = { candidateRegister, candidateList, candidateDelete }