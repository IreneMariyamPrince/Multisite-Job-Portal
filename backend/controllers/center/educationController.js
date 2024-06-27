/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

const {educationQualificationInfo , educationSpecializationInfo} = require('../../sequelize')

const qualificationList = async(req,res)=>{
    try{
        const qualificationInfo = await educationQualificationInfo.findAll({
            attributes:[
                'eduQualificationId',
                'qualification',
              ]
        })
        return res.status(200).json({data:qualificationInfo})
    }catch(error){
        return res.status(500).json({error:"Internal Server Error"})
    }
}

const specializationList= async(req,res)=>{
    const{eduQualificationId } = req.query 
    try{
        const specializationInfo = await educationSpecializationInfo.findAll({where:{eduQualificationId:eduQualificationId},
            attributes:[
                'eduSpecializationId',
                'specialization',
              ]
        })
        return res.status(200).json({data:specializationInfo})
    }catch(error){
        return res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={qualificationList,specializationList}