import express from "express"; 
import jwtValid from "../../middlewares/verifyJwt.middleware.js"; 
import multer from "multer"; 
import { User } from "../../models/users.models.js";

const router = express.Router(); 


const storage = multer.memoryStorage(); 
const upload = multer({storage: storage}); 


router.post('/',jwtValid,upload.single('profilePicture'),async (req,res)=>{
    try{
        const userName = req.user.userName; 

        if (req.file) {
            const profilePicture = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
            const user = await User.findOne({userName}); 
            if(!user){
                return res.status(400).json({message : "user Not Found"}); 
            }
            user.profilePicture = profilePicture ; 
            await user.save(); 
            res.status(200).send('Profile picture uploaded successfully');
        }else {
            const profilePicture = {
                data: null,
                contentType: null            }
            const user = await User.findOne({userName}); 
            if(!user){
                return res.status(400).json({message : "user Not Found"}); 
            }
            user.profilePicture = profilePicture ; 
            await user.save(); 
            res.status(200).send('Profile Picture Removed successfully!'); 
        }
    }
    catch(e){
        console.log('Profile Uploding Error',e); 
        res.status(401).json({message : "Unable to upload profile picture"}); 
    }
}); 

router.get('/:userName', async (req, res) => {
    try {
        const userName = req.params.userName; 
        const user = await User.findOne({userName}); 
        if (!user) {
        return res.status(404).send('User not found');
        }

        if (!user.profilePicture || !user.profilePicture.data) {
        return res.status(200).send(null);
        }

        res.contentType(user.profilePicture.contentType);
        res.send(user.profilePicture.data);
    } catch (e) {
        console.log('Profile Uploding Error',e); 
        res.status(401).json({message : "Unable to load profile picture"}); 
    }
});

router.get('/',jwtValid,async (req,res) => {
    const userId = req.user.id; 
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.profilePicture || !user.profilePicture.data) {
            return res.status(200).send(null);
        }

        res.contentType(user.profilePicture.contentType);
        res.send(user.profilePicture.data);
    } catch (e) {
        console.log('Profile Uploding Error',e); 
        res.status(401).json({message : "Unable to load profile picture"}); 
    }
}); 


export default router; 