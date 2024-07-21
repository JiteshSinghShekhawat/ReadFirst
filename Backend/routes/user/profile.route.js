import express from "express"; 
import { User } from "../../models/users.models.js";

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

router.put('/',(req,res)=>{
    res.sendStatus(200); 
});

export default router ;