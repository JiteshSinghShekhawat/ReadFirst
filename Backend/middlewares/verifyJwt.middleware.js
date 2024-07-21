import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

const SECRET_KEY = process.env.SECRET_KEY || "MySecretKeyIsCrazyBitch";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    valid: false,
                    message: "Token not valid"
                });
            }
            req.user = user; 
            next();
        });
    } else {
        return res.status(403).json({
            valid: false,
            message: "Token not provided or invalid format"
        });
    }
};

export default authenticateJWT;
