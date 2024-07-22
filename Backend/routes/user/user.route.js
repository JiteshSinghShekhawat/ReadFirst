import express from "express"; 
import registerRoute from "./register.route.js";
import loginRoute from "./login.route.js"; 
import forgetPasswordRouter from "./forgetPassword.js"; 
import resetPasswrodRouter from "./resetPassword.js"; 
import jwtValid from "../../middlewares/verifyJwt.middleware.js"; 
import profileRoute from "./profile.route.js"; 

const router = express.Router(); 

router.use('/register',registerRoute); 

router.use("/forgotPassword",forgetPasswordRouter); 

router.use("/resetPassword",resetPasswrodRouter); 

router.use('/login',loginRoute); 

router.use('/profile',jwtValid,profileRoute); 
export default router ; 