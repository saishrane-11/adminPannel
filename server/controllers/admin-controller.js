
const Contact = require('../models/contact-model');
const User = require('../models/user-model');
const getAllUser = async(req,res)=>{
    try{
        const users = await User.find({},{password:0});
        if(!users || users.length === 0){
           return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(users)
    }catch(err){
        // next(err);
    }
}

const getAllContact= async(req,res)=>{
    try{
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0){
           return res.status(404).json({message:"No contacts found"});
        }
        return res.status(200).json(contacts)
    }catch(err){
        next(err);
    }
}

//user delete logic
const delteUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted successfully"});
    }catch(error){
        next(error)
    }
}
//single user logic
const getUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findOne({_id:id},{password:0});
        return res.status(200).json(user);
    }catch(error){
        next(error)
    }
}

//update single user by id\
const updateUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedUser = await User.updateOne({_id:id},{
            $set: updatedUserData,
        });
        return res.status(200).json(updatedUser);
    }catch(error){
        next(error)
    }
}


const deleteContactById = async (req,res)=>{
    try{
        const id = req.params.cid;
        console.log(id);
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contact Deleted successfully"});
    }catch(error){
        next(error);
    }
}
module.exports = {getAllUser,getAllContact,delteUserById,getUserById,updateUserById,deleteContactById};

