const Service = require('../models/service-model');
const service = async (req,res)=>{
    try{
        const serviceData= await Service.find();
        return res.status(200).json({msg:serviceData})
    }catch(err){
        res.status(401).json({msg:"service Denied"})
    }
}
module.exports = service;