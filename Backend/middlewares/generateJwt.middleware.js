import jwt from "jsonwebtoken"; 
import dotenv,{config} from "dotenv" ;

dotenv.config({
    path : "../.env"
}); 

const SECRET_KEY = process.env.SECRET_KEY || "MySecretKeyIsCrazyBitch"; 

const generateJWT = (user)=> {
    const payload = {
        id: user.id, 
        userName: user.userName
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: `${process.env.JWT_EXPIRES_IN}d` });
    return token ; 
}; 


export default generateJWT ; 