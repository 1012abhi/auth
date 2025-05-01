import { validationResult } from 'express-validator'
import {userModel} from "../models/user.model.js";
import createUser from '../services/user.service.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res, next) => {
    
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password, role } = req.body
    console.log('role164', role);
    
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' })
    }
    
    const hashedPassword = await userModel.hashPassword(password);
    
    const user = await createUser({
        email,
        password: hashedPassword,
        role,
        isVerified: false,
    });

    
    // Generate a verification token
    const verificationToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use TLS
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verifyemail/${verificationToken}`;
    // Send email with verification link    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Thank you for registering. Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">Verify Email</a>
               <p>This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    // const token = user.generateAuthToken();
    // res.status(201).json({ message: 'Account created. Please verify your email.' });
    res.status(201).json({ user });
}

const verifyEmail = async (req, res) => {
    const token = req.params.token;
    console.log('token', token);
    
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully', user, token });
    } catch (error) {
        console.error('Email Verification Error:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    
    const user = await userModel.findOne({ email }).select('+password');
    
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ messages: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)
    res.status(200).json({token, user})

}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

const logoutUser = async (req, res, next) => {
    try {
        // Clear the token from cookies
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });

        // Optionally, you can blacklist the token if you are maintaining a token blacklist
        // const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        // await BlacklistToken.create({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
    try {
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use TLS
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetLink}">Click here to reset your password</a>
                   <p>This link will expire in 1 hour.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await userModel.hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await userModel.findById(req.user._id).select('+password');
        console.log('user updatepass 212', user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the old password matches
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }
        if (!oldPassword) {
            user.password = await userModel.hashPassword(newPassword);
            await user.save();
            return res.status(400).json({ message: 'Password updated successfully' });
        }

        // Update the password
        user.password = await userModel.hashPassword(newPassword);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully', user });
    } catch (error) {
        console.error('Update Password Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Find the user by ID
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        // Save the updated user
        await user.save();
 
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const logoutUser = async (req, res, next) => {
//     res.clearCookie('token');
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1];

//     await BlacklistToken.create({token: token})
//     res.status(200).json({ message: 'Logged out' });
// }

export {registerUser, loginUser, getUserProfile, logoutUser, 
forgotPassword, resetPassword, verifyEmail, updateUserProfile,
updatePassword};
