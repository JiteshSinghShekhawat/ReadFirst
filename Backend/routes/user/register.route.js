import express from "express"; 
import bcrypt from "bcrypt"; 
import { User } from "../../models/users.models.js";
import generateJWT from "../../middlewares/generateJwt.middleware.js";

const router = express.Router(); 


router.post('/',async (req,res)=>{
    const {userName, email, password,fullName} = req.body ; 
    
    try{
        let existingUser = await User.findOne({email}); 
        if(existingUser){
            return res.status(400).json({
                valid : false, 
                message : "User Already Exist with Same Email"
            }); 
        }
        let existingUserName = await User.findOne({userName}); 
        if(existingUserName){
            return res.status(400).json(
                {
                    valid : false, 
                    message : "UserName Already Used !"
                }
            )
        }; 

        if(!password){
            return res.status(401).json({
                valid : false, 
                message : "Password Not Found" 
            }); 
        }

        const hashedPassword = await bcrypt.hash(password,10); 
        
        var newUser; 
        try{
            newUser = new User(
                {
                    userName, 
                    email, 
                    password : hashedPassword , 
                    fullName
                }
            ); 
            await newUser.save(); 
        }catch(e){
            console.log('Error while Registering User',e); 
        }

        var token ; 
        try{
            token = generateJWT(newUser); 
        }catch(e){
            console.log('Error while generating token in Registration',e); 
        }

        res.status(200).json(
            {
                valid : true, 
                message : "User Registered ! Successfully", 
                token : token
            }
        )
    }catch(e){
        res.status(400).json(
            {
                valid : false , 
                message : "Sign Up Failed !"
            }
        )
    }

});

export default router; 