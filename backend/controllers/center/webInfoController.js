/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer = require('multer');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { UserRoles, Avatar, WebSourceStatus } = require('../../constants/constants');
const { user, sequelize, regionalUserInfo, webSources } = require('../../sequelize');
const { createTransporter } = require('../../transporter/emailService')
const { URL } = require('url');

//webinfo Register
const webInfoRegister=async(req,res)=>{
    const{webSourceId,webInfoTheme, webInfoWebUrl, webInfoTitle } = req.body
    try{
        let existingWebInfo = await webSources.findOne({where:{webSourceId}})
        if(!existingWebInfo){
            return res.status(404).json({error : "Web Infomation Not Found"})
        }
        // Extract domain from webInfoWebUrl
        let domain = webInfoWebUrl.replace(/^(https?:\/\/)?(www\.)?/i, ''); 
        existingWebInfo = await existingWebInfo.update({
            webInfoTheme,
            webInfoWebUrl:domain,
            webInfoTitle,
            webInfoStatus: WebSourceStatus.IN_PROGRESS
        });
        res.status(200).json({message:"Web Information Updated Successfully", webInfo: existingWebInfo})
    } catch(error){
        console.error("Error",error)
        res.status(500).json({error:'Internal server error'})
    }
    
}

const webInfoDecline = async(req,res)=>{
    const {webSourceId}=req.body
    try{
        let existingWebInfo = await webSources.findOne({where:{webSourceId}})
        if(!existingWebInfo){
            return res.status(404).json({message:'No Websources Available'})    
        }
        await existingWebInfo.update({
            webInfoStatus: WebSourceStatus.DECLINE
        })
        return res.status(200).json({
            message:'Region Request Declined Successfully'
        })

    }catch(error){
        return res.status(500).json({error:'Internal Server Error'})
    }
}


module.exports = {webInfoRegister,webInfoDecline}