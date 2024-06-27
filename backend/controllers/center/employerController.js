/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRoles, Avatar, WebSourceStatus } = require('../../constants/constants');
const { user, sequelize, regionalUserInfo, webSources, employerInfo } = require('../../sequelize');
const { createTransporter } = require('../../transporter/emailService')
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const initMulter = require('../../middlewares/multerConfig');

const subdirectory = 'employer';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const upload = initMulter(subdirectory, allowedFileTypes);

//Employer List
const employerList = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1; // Get the requested page number, default to 1 if not provided
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8; // Number of items per page
  const{searchQuery, filterOption, orderByDate} = req.query
  try {

    let whereClause = {
      userRoleId: UserRoles.EMPLOYER
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
        model: employerInfo,
        required: true,
        attributes: [
          'name',
          'sector',
          'websiteUrl',
          'contactPerson',
          'contactPersonDesignation',
          'contactPersonMobile',
          'address1',
          'address2',
          'district',
          'state',
          'logo',
        ],
        as: 'employerInfo'
      },

    ];

    if (filterOption) {
      whereClause.userStatus = filterOption;
    }
    const order = [];
    if (orderByDate === 'asc' || orderByDate === 'desc') {
      order.push(['createdAt', orderByDate]);
    }
    const employerData = await user.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      offset: (page - 1) * pageSize, // Calculate offset based on page number
      limit: pageSize,

      attributes:[
        'userId',
        'firstName',
        'lastName',
        'email',
        'mobile',
        'userRoleId',
        'userStatus'
      ],
      order:order
    })

    const processedEmployerData = employerData.rows.map(employer => {
      let modifiedEmployerInfo = { ...employer.employerInfo.toJSON() };    
      // Check if the logo is 'uploads/sample/avatar.jpg'
      if (employer.employerInfo.logo === 'uploads/sample/avatar.jpg') {
        modifiedEmployerInfo.logo = `${process.env.BASE_URL}/sample/avatar.jpg`; // Set logo to 'this' if condition is met
      } else {
        modifiedEmployerInfo.logo = `${process.env.BASE_URL}/employer/${employer.employerInfo.logo}`; // Set logo to the processed URL
      }    
      return {
        ...employer.toJSON(),
        employerInfo: modifiedEmployerInfo // Assign the modified employerInfo to the new object
      };
    });

    
    const totalPages = Math.ceil(employerData.count / pageSize);

    return res.status(200).json({
      count:employerData.count,
      data: processedEmployerData,
      totalPages: totalPages
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", msg : error})
  }
}

//Employer Create
const employerCreate = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const { firstName, lastName, gender, email, mobile, webInfoWebUrl, companyName, companySector, websiteUrl, contactPerson, contactPersonDesignation, contactPersonMobile } = req.body;

      if (!firstName || !lastName || !gender || !email || !mobile || !webInfoWebUrl || !companyName || !companySector || !contactPerson || !contactPersonDesignation || !contactPersonMobile) {
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
        userRoleId: UserRoles.EMPLOYER,
        userStatus: '2',
      });

      await employerInfo.create({
        userId: userInfo.userId,
        webSourceId: webSourceInfo.webSourceId,
        name: companyName,
        sector: companySector,
        logo: logoPath,
        websiteUrl: websiteUrl,
        contactPerson: contactPerson,
        contactPersonDesignation: contactPersonDesignation,
        contactPersonMobile: contactPersonMobile,
        address1: null,
        address2: null,
        district: null,
        state: null,
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

//Employer Delete
const employerDelete = async(req,res)=>{
  const{userId}=req.body
  if(!userId){
    return res.status(400).json({message : 'User Id Required'})
  }
  if (userId === 1) {
    return res.status(403).json({ message: 'Deleting user ID 1 is not allowed' });
  }
  try{
    const employer = await user.findOne({ where: { userId: userId, userRoleId:UserRoles.EMPLOYER } });
    if(employer===null){
      return res.status(404).json({message:'No permission to access this user'})
    }
    await user.destroy({where:{userId:userId}})
    await employerInfo.destroy({where:{userId:userId}})
    return res.json({
      success:true,
      message:'Employer Successfully Deleted '
    })

  }catch(error){
    return res.status(500).json({error : 'Internal Server Error', msg :error})
  }
}



module.exports = { employerCreate, employerList,employerDelete }
