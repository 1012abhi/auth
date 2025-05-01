import { Router } from "express";
import { body, param } from 'express-validator'
import {registerUser, loginUser, getUserProfile, logoutUser, forgotPassword, resetPassword, verifyEmail, updateUserProfile, updatePassword} from '../controller/user.controller.js'
import { authUser } from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";
import { userModel } from "../models/user.model.js";

const router = Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], 
    registerUser
)

router.post('/verifyemail/:token', 
    param('token').notEmpty().withMessage('Token is required'),
    verifyEmail)
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('invalid password'),
],
    loginUser
)
router.get('/profile', authUser, getUserProfile)
router.put('/updateuser', authUser, updateUserProfile)
router.get('/logout', authUser, logoutUser)
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.put('/updatepassword', authUser, [
    body('oldPassword').isLength({min: 6}).withMessage('Old password must be at least 6 characters long'),
    body('newPassword').isLength({min: 6}).withMessage('New password must be at least 6 characters long'),
], 
  updatePassword
)

// Google OAuth Login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const user = req.user;
    console.log("USER callbase routes:", user);
    const token = user.generateAuthToken();
    // res.cookie('token', token)
    const redirectURL = `${process.env.FRONTEND_URL}/oauthsuccess?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectURL); // Redirect to profile or dashboard
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect('/login');
  });
});

export default router