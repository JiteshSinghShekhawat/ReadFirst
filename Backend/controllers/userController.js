import bcrypt from 'bcrypt';
import { User } from '../models/users.models.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import generateJWT from '../middlewares/generateJwt.middleware.js';

export const check = async (req,res) => {
    return res.status(200).json({valid : true}); 
}

export const register = async (req, res) => {
    const { userName, email, password, fullName } = req.body;
    if (!password || !userName || !email || !fullName) {
        return res.status(401).json({
            valid: false,
            message: 'Field Missing fill all the fields',
        });
    }
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                valid: false,
                message: 'User Already Exist with Same Email',
            });
        }
        let existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({
                valid: false,
                message: 'UserName Already Used !',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        var newUser;
        try {
            newUser = new User({
                userName,
                email,
                password: hashedPassword,
                fullName,
            });
            await newUser.save();
        } catch (e) {
            console.log('Error while Registering User', e);
        }

        var token;
        try {
            token = generateJWT(newUser);
        } catch (e) {
            console.log('Error while generating token in Registration', e);
        }

        res.status(200).json({
            valid: true,
            message: 'User Registered ! Successfully',
            token: token,
        });
    } catch (e) {
        res.status(400).json({
            valid: false,
            message: 'Sign Up Failed !',
        });
    }
};

export const login = async (req, res) => {
    const { input, password } = req.body;

    var query = {};

    if (input.includes('@')) {
        query.email = input;
    } else {
        query.userName = input;
    }

    const user = await User.findOne(query);

    if (!user) {
        return res.status(400).json({
            valid: false,
            message: 'Please Enter valid email or Username! ',
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            valid: false,
            message: 'Please Enter Correct Password',
        });
    }

    var token;
    try {
        token = generateJWT(user);
    } catch (e) {
        console.log('Error in Login token Generation', e);
    }
    return res.status(200).json({
        valid: true,
        message: 'Login Successfull',
        token: token,
    });
};

export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    function generateOTP() {
        return crypto.randomInt(1000, 10000).toString();
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3',
        },
    });
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User with email does not exist');
        }
        const otp = generateOTP();

        user.otp = otp;
        user.otpExpires = Date.now() + 3600000;

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 1 hour.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (e) {
        console.log('Error in forgot Password finding email', e);
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!otp) {
            return res.status(200).json({ status: 'OK' });
        }
        if (user.otp != otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (!newPassword) {
            return res.status(200).json({ status: 'OK' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetPasswordOTP = 0;
        user.resetPasswordExpires = 0;
        user.otp = Math.random();
        await user.save();
        res.status(200).send('Password has been reset');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const userName = req.user.userName;
        const user = await User.findOne({ userName });
        if (!user) {
            res.status(401).json({ message: 'please enter valid Email' });
            return;
        }
        if (!password) {
            return res.status(401).json({ message: 'Please Enter password!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Wrong ! Password ' });
            return;
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({ message: 'Password! Updated Successfully.' });
    } catch (e) {
        console.log('Error while updating password', e);
        res.status(400).json({ message: 'Unable to Update Password ' });
    }
};

export const profilePhotoUpload = async (req, res) => {
    try {
        const userName = req.user.userName;

        if (req.file) {
            const profilePicture = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).json({ message: 'user Not Found' });
            }
            user.profilePicture = profilePicture;
            await user.save();
            res.status(200).send('Profile picture uploaded successfully');
        } else {
            const profilePicture = {
                data: null,
                contentType: null,
            };
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).json({ message: 'user Not Found' });
            }
            user.profilePicture = profilePicture;
            await user.save();
            res.status(200).send('Profile Picture Removed successfully!');
        }
    } catch (e) {
        console.log('Profile Uploding Error', e);
        res.status(401).json({ message: 'Unable to upload profile picture' });
    }
};

export const userNameProfilePhoto = async (req, res) => {
    const { userName } = req.params;
    console.log(userName); 
    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).send('User not found');
        }
        
        if (!user.profilePicture || !user.profilePicture.data) {
            return res.status(200).send('Jitesh');
        }
        res.contentType(user.profilePicture.contentType);
        res.send(user.profilePicture.data);
    } catch (e) {
        console.log('Profile Uploding Error', e);
        res.status(401).json({ message: 'Unable to load profile picture' });
    }
};

export const getProfilePhoto = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.profilePicture || !user.profilePicture.data) {
            return res.status(200).json({"boom":"jitesh"});
        }
        res.contentType(user.profilePicture.contentType);
        res.send(user.profilePicture.data);
    } catch (e) {
        console.log('Profile Uploding Error', e);
        res.status(401).json({ message: 'Unable to load profile picture' });
    }
};

export const userProfile = async (req, res) => {
    const { userName } = req.user;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({
            email: user.email,
            userName: user.userName,
            fullName: user.fullName,
            bio: user.bio,
        });
    } catch (e) {
        res.status(500).json({
            message: 'An error occurred while fetching the profile.',
        });
    }
};

export const userNameProfile = async (req, res) => {
    const { userName } = req.params;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({
            email: user.email,
            userName: user.userName,
            fullName: user.fullName,
            bio: user.bio,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the profile.',
        });
    }
};

export const userProfileUpdate = async (req, res) => {
    try {
        const { userName, email, fullName, bio } = req.body;
        const request = req.user.userName;
        const user = await User.findOne({ userName: request });
        if (!user) {
            return res.sendStatus(404);
        }
        if (userName) {
            const alreadyExist = await User.findOne({ userName });
            if (alreadyExist) {
                return res.status(401).json({
                    message: 'Sorry userName Already taken',
                });
            }
            user.userName = userName;
        }
        if (email) {
            const alreadyExist = await User.findOne({ email });
            if (alreadyExist) {
                return res.status(401).json({
                    message: 'Sorry email Already taken',
                });
            }
            user.email = email;
        }
        if (fullName) {
            user.fullName = fullName;
        }
        if (bio) {
            user.bio = bio;
        }
        user.save();
        const token = generateJWT(user);
        res.status(200).json({
            token: token,
        });
    } catch (e) {
        console.log(`Error while updating user Profile ${e}`);
    }
};
