const adminMiddleware= async (req,res,next)=>{
    try{
        console.log("thisone:"+req.user);
        const adminRole =  req.user.isAdmin;
        if(!adminRole){
            console.log("not an admin");
            return res.status(403).json({message:"Access Denied. User is not admin"});
        }
        // res.status(200).json({message:req.user.isAdmin})
        next();
    }catch(err){

    }
}
module.exports = adminMiddleware;