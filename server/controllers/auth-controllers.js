const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
//get Method
const home = async (req, res) => {
    try {
        res.status(200).send({ msg: "Welcome to Home page" });
    } catch {
        res.status(404).send({ msg: "page not found" });
    }
}


//post Method
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "user already exists" });
        }
        // one way to hash password
        // const saltround = 10;
        // const hash_password = await bcrypt.hash(password, saltround);

        const userCreated = await User.create({ username, email, phone, password });

        res.status(200).send({
            msg: "registration successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch {
        res.status(404).send({ msg: "page not found" });
    }
}



//login method 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({ msg: "User doesn't exists" });
        }
        const user = await userExist.checkPassword(password);
        // const user =await bcrypt.compare(password, userExist.password);
        if (user) {
            res.status(200).json({
                msg: "login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(401).send({ msg: "Invalid credentials" });
    }
}


const user = async (req,res)=>{
    try{
        const userData = req.user;
        // console.log("in aut controler User data: "+userData);
        return res.status(200).json(userData);
    }catch(err){
        res.status(404).json({msg:"page not found"});
    }
}
module.exports = { home, register ,login, user}