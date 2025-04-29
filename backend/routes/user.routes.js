import { Router } from "express";
import { body, param } from 'express-validator'
import {registerUser, loginUser, getUserProfile, logoutUser, forgotPassword, resetPassword, verifyEmail} from '../controller/user.controller.js'
import { authUser } from "../middleware/auth.middleware.js";

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
router.get('/logout', authUser, logoutUser)
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router