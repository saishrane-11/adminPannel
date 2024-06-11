const {z} = require('zod');
const loginSchema = z.object({
    email: z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email"})
    .min(3,{message:"email must be atleast three characters"})
    .max(255,{message:"email must be less than 255 characters"}),
    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(10,{message:"password must contain 10 number only"})
    .max(255,{message:"password must contain 10 number only"}),
    
})
const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"name must be atleast three characters"})
    .max(255,{message:"name must be less than 255 characters"}),
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"phone must contain 10 number only"})
    .max(20,{message:"phone must contain 10 number only"}),
  


})


module.exports = {signupSchema,loginSchema};