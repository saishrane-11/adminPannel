const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

//data save hone se pahle ye method chalega
userSchema.pre('save', async function(next){
    // console.log("pre methodt:", this);
    const user = this;
    //if new password is not created
    if(!user.isModified('password')){
        next();
    }
    //if new password is created
    try{
         const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltround);
        user.password = hash_password;
    }catch(error){
        next(error)
    }
})

//json web token 
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"10d",
            }
        )
    }catch(error){
        console.error(error);
    }
}

//check user password while login
userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password, this.password);
    // try{
    //     const user = await bcrypt.compare(password, this.password);
    //     if(user){
    //         return user;
    //     }else{
    //         return false;
    //     }
    // }catch(error){
    //     console.error(error)
    // }
}


const User  = new mongoose.model("User", userSchema);
module.exports = User;