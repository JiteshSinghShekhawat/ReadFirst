import express from "express"; 
import bcrypt from "bcrypt"; 
import { User } from "../../models/users.models.js";
import generateJWT from "../../middlewares/generateJwt.middleware.js";

const router = express.Router(); 


router.post('/', async(req,res)=>{
    const {input,password} = req.body; 

    var query = {}; 

    if(input.includes('@')){
        query.email = input; 
    }else{
        query.userName = input ;
    }

    const user = await User.findOne(query); 

    if(!user){
        return res.status(400).json(
            {
                valid : false, 
                message : "Please Enter valid email or Username! "
            }
        ); 
    }
    
    const isMatch = await bcrypt.compare(password,user.password); 

    if(!isMatch){
        return res.status(401).json(
            {
                valid : false , 
                message : "Please Correct Password"
            }
        ); 
    }
    
    var token ; 
    try{
        token = generateJWT(user); 
    }catch(e){
        console.log('Error in Login token Generation',e); 
    }
    return res.status(200).json(
        {
            valid : true,
            message : "Login Successfull", 
            token : token
        }
    ); 
});


export default router ;