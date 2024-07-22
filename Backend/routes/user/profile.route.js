import express from "express"; 
import { User } from "../../models/users.models.js";
import generateJWT from "../../middlewares/generateJwt.middleware.js";

const router = express.Router(); 

router.get('/',async (req,res)=>{
    const {userName} = req.user;
    try{
        const user = await User.findOne({userName}); 
        if(!user){
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(
            {
                email : user.email,
                userName : user.userName,
                fullName : user.fullName,
                bio : user.bio
            }
        );
    }catch(e){
        res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
});

router.get('/:userName',async (req,res)=>{
    const { userName } = req.params;
    try {
      const user = await User.findOne({userName});
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(
        {
            email : user.email,
            userName : user.userName,
            fullName : user.fullName,
            bio : user.bio
        }
    );
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the profile.' });
    }
}); 

router.patch('/',async (req,res)=>{
    const {userName, email, fullName, bio} = req.body ;
    const request = req.user.userName ; 
    const user = await User.findOne({userName : request}); 
    if(!user){
        return res.sendStatus(404); 
    }
    if(userName){
        const alreadyExist = await User.findOne({userName}); 
        if(alreadyExist){
            return res.status(401).json(
                {
                    message : "Sorry userName Already taken"
                }
            ); 
        }
        user.userName = userName; 
    }
    if(email){
        const alreadyExist = await User.findOne({email}); 
        if(alreadyExist){
            return res.status(401).json(
                {
                    message : "Sorry email Already taken"
                }
            ); 
        }
        user.email = email ;
    }
    if(fullName){
        user.fullName = fullName ; 
    }
    if(bio){
        user.bio = bio ; 
    }
    user.save(); 
    const token = generateJWT(user); 
    res.status(200).json({
        token : token
    }); 
});

export default router ;