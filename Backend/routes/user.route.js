import express from 'express';
import { register } from '../controllers/userController.js';
import { login ,check} from '../controllers/userController.js';
import { forgetPassword } from '../controllers/userController.js';
import { resetPassword } from '../controllers/userController.js';
import { updatePassword } from '../controllers/userController.js';
import { profilePhotoUpload } from '../controllers/userController.js';
import { userNameProfilePhoto } from '../controllers/userController.js';
import { getProfilePhoto } from '../controllers/userController.js';
import { userProfile } from '../controllers/userController.js';
import { userNameProfile } from '../controllers/userController.js';
import { userProfileUpdate } from '../controllers/userController.js';
import multer from 'multer';
import jwtValid from '../middlewares/verifyJwt.middleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/check',check)

router.post('/register', register);

router.post('/login', login);

router.post('/forgotPassword', forgetPassword);

router.post('/resetPassword', resetPassword);

router.post('/updatePassword', jwtValid, updatePassword);

router.post(
    '/profilePicture',
    jwtValid,
    upload.single('profilePicture'),
    profilePhotoUpload
);

router.get('/profilePicture/:userName', userNameProfilePhoto);

router.get('/profilePicture', jwtValid, getProfilePhoto);

router.get('/profile', jwtValid, userProfile);

router.get('/profile/:userName', userNameProfile);

router.patch('/profile', jwtValid, userProfileUpdate);

export default router;
