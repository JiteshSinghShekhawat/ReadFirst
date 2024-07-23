import express from "express" ; 
import { User } from "../../models/users.models.js";
import bcrypt from "bcrypt"; 

const router = express.Router(); 


router.post("/",async (req,res) =>{
    const {password,newPassword} = req.body ; 
    const userName = req.user.userName; 
    const user = await User.findOne({userName}); 
    if(!user){
        res.status(401).json({message : "please enter valid Email"}); 
        return ; 
    }
    if(!password){
        return res.status(401).json({message : "Please Enter password!"}); 
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(401).json({message : "Wrong ! Password "}); 
        return ; 
    }

    user.password = await bcrypt.hash(newPassword,10); 

    await user.save(); 

    res.status(200).json({message : "Password! Updated Successfully."}); 
}); 


export default router; 