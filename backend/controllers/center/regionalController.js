/* eslint-disable no-inner-declarations *//* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRoles, Avatar, WebSourceStatus, UserStatus } = require('../../constants/constants');
const { user, sequelize, regionalUserInfo, webSources } = require('../../sequelize');
const { createTransporter } = require('../../transporter/emailService')
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const initMulter = require('../../middlewares/multerConfig');
const { exportToExcel } = require('../exportController')
const {convertUserStatus} = require('../../utility/convertStatus')

const subdirectory = 'region';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = initMulter(subdirectory, allowedFileTypes);


//Region List
const regionsList = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
  const { searchQuery, filterOption, orderByDate } = req.query;

  try {
    let whereClause = {
      userRoleId: UserRoles.REGION
    };

    if (searchQuery) {
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

    if (filterOption) {
      whereClause.userStatus = filterOption;
    }
    const order = [];
    if (orderByDate === 'asc' || orderByDate === 'desc') {
      order.push(['createdAt', orderByDate]);
    }

    // counts
    const totalRegion = await user.count({
      where:{userRoleId:UserRoles.REGION}
    })
    const totalActiveRegions = await user.count({
      where:{
        userRoleId:UserRoles.REGION,
        userStatus:UserStatus.ACTIVE
      }
    })
    const totalPendingRegions = await user.count({
      where:{
        userRoleId: UserRoles.REGION,
        userStatus:UserStatus.PENDING
      }
    })

    // If export flag is not set to 'excel', continue with pagination
    const regionData = await user.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      offset: (page - 1) * pageSize, // Calculate offset based on page number
      limit: pageSize, // Limit the number of results per page
      attributes: [
        'userId',
        'firstName',
        'lastName',
        'email',
        'mobile',
        'userRoleId',
        'userStatus',
        'createdAt',
        'updatedAt',
      ],
      order: order
    });

    const processedRegionData = regionData.rows.map(row => {
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

    const totalPages = Math.ceil(regionData.count / pageSize);

    return res.status(200).json({ counts: {totalCount:regionData.count, totalActiveRegions:totalActiveRegions,totalPendingRegions:totalPendingRegions}, data: processedRegionData, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Region Register

const regionRegister = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { firstName, lastName, gender, email, mobile, webInfoWebUrl } = req.body;

      if (!firstName || !lastName || !gender || !email || !mobile || !webInfoWebUrl) {
        return res.status(400).json({ error: 'Fill out all mandatory fields' });
      }

      let logoPath = Avatar.PATH;

      if (req.files['logo']) {
        logoPath = req.files['logo'][0].filename;
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
        userRoleId: UserRoles.REGION,
        userStatus: '2',
      });

      await regionalUserInfo.create({
        userId: userInfo.userId,
        webSourceId: webSourceInfo.webSourceId,
        gender,
        dob: null,
        logo: logoPath,
        address1: null,
        address2: null,
        pinCode: null,
        district: null,
        state: null,
      });

      await webSources.create({
        userId: userInfo.userId,
        webSourceName: firstName,
        webInfoTheme: null,
        webInfoWebUrl: null,
        webInfoTitle: null,
        webInfoLogo: logoPath,
        webInfoStatus: WebSourceStatus.PENDING,
      });

      return res.status(201).json({ success: 'Region registered successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//RegionWebInfo list

const regionWebInfo = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
  const { searchQuery, filterOption, orderByDate, themeFilter } = req.query;
  try {
    let whereClause = {
      userRoleId: UserRoles.REGION
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

    if (filterOption) {
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
    if (themeFilter) {
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

    //counts
    const regionWebActiveUsers = await webSources.count({
      where: { webInfoStatus: WebSourceStatus.ACTIVE, userId: { [Op.ne]: 1 } // Exclude records with userId equal to 1
      } 
    });
    const regionWebEmailSent = await webSources.count({
      where: { webInfoStatus: WebSourceStatus.MAIL_SENT, userId: { [Op.ne]: 1 } },
    });
    const regionWebinProgress = await webSources.count({
      where: { webInfoStatus: WebSourceStatus.IN_PROGRESS, userId: { [Op.ne]: 1 } },
    });
    const regionWebPending = await webSources.count({
      where: { webInfoStatus: WebSourceStatus.PENDING, userId: { [Op.ne]: 1 } },
    });
    const regionWebRejected = await webSources.count({
      where: { webInfoStatus: WebSourceStatus.DECLINE, userId: { [Op.ne]: 1 } },
    });
    const regionData = await user.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      offset: (page - 1) * pageSize, // Calculate offset based on page number
      limit: pageSize, // Limit the number of results per page
      attributes: [
        'userId',
        'firstName',
        'lastName',
        'email',
        'mobile',
      ],
      order: order
    });

    const processedRegionData = regionData.rows.map(row => {
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


    const totalPages = Math.ceil(regionData.count / pageSize);

    return res.status(200).json({ counts:{totalCount:regionData.count, regionWebActiveUsers:regionWebActiveUsers,regionWebEmailSent:regionWebEmailSent,regionWebinProgress:regionWebinProgress, regionWebPending:regionWebPending,regionWebRejected:regionWebRejected } , data: processedRegionData, totalPages: totalPages });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

//Region Approve (email)
const regionApprove = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email Address Is Required' })
  }
  try {
    const userData = await user.findOne({ where: { email } });
    const regionWebInfo = await webSources.findOne({ where: { userId: userData.userId } })
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const transporter = createTransporter()
    const passwordSet = `${process.env.BASE_FRONTEND_URL}reset-password?token=${token}`;
    if(regionWebInfo.webInfoTheme === null || regionWebInfo.webInfoWebUrl === null || regionWebInfo.webInfoTitle === null){
      return res.status(400).json({ error: 'You have to fill all relevent data' });
    }
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'Welcome to MJPS',
      html: `Click <a href="${passwordSet}">here</a> to reset your password. This link is valid for 1 hour.`,
    });

    await regionWebInfo.update({
      webInfoStatus: WebSourceStatus.MAIL_SENT
    })

    return res.status(200).json({ success: 'Email Sent Successfully', });
  }
  catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

//Region Delete
const regionDelete = async (req, res) => {

  const { userId } = req.body
  if (!userId) {
    return res.status(400).json({ message: 'User Id Required' })
  }
  if (userId === 1) {
    return res.status(403).json({ message: 'Deleting user ID 1 is not allowed' });
  }
  try {
    await webSources.destroy({ where: { userId: userId } })
    await regionalUserInfo.destroy({ where: { userId: userId } })
    await user.destroy({ where: { userId: userId } })
    return res.status(200).json({ message: 'Region Deleted successfully' })
  }
  catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }

}




module.exports = { regionRegister, regionsList, regionWebInfo, regionApprove, regionDelete };
