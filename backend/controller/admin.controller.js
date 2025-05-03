import { validationResult } from 'express-validator'
import {userModel} from "../models/user.model.js";
import { course, updateCourses } from '../services/admin.service.js';
import { courseModel } from '../models/course.model.js';
import nodemailer from "nodemailer";

// User Controller
const createUser = async (req, res, next) => {
    const { name, email, password, role, profilePicture, phone } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            error: errors.array()
        })
    }
    // Check if all required fields are present
    if (!name || !email || !password || !role || !profilePicture || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }
    // Check if the user is authenticated and has the required role (admin)
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        })
    }
    try {
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userModel.create({ 
            name,
            email, 
            password: hashedPassword, 
            role, 
            profilePicture, 
            phone,
            isVerified: false,
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User creation failed",
            })
        }
        // Generate a token for the user
        const token = user.generateAuthToken()
        // Set the token in the response header
        res.setHeader("x-auth-token", token)
        // Set the token in the response cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const getAllUsers = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            error: errors.array()
        })
    }
    try {
        const users = await userModel.find({}).select("-password").populate("role", "-__v").lean().exec()
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params
    const { name, email, role } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            error: errors.array()
        })
    }
    try {
        const user = await userModel.findByIdAndUpdate(id, { name, email, role }, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// Course Controller
const createCourse = async (req, res, next) => {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            error: errors.array(),
        });
    }
    const { title, description, price, category, thumbnail } = req.body;
    // Check if all required fields are present
    if (!title || !description || !price || !category || !thumbnail) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
    // Check if the price is a valid number
    if (isNaN(price)) {
        return res.status(400).json({
            success: false,
            message: "Price must be a number",
        });
    }
    // Check if the user is authenticated and has the required role (admin)
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        });
    }

    try {
        const courseData = {
        title,
        description,
        price,
        category,
        thumbnail,
        createdBy: req.user._id, // Assuming `req.user` is set by auth middleware
        };

        const result = await course(courseData);

        if (result.success) {
            // Fetch all users' email addresses excluding admins
            const users = await userModel.find({ role: { $ne: "admin" } }, "email").lean();
            if (users.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "Course created successfully, but no users to notify.",
                    data: result.data,
                });
            }
            const emailAddresses = users.map((user) => user.email);

            // Send notification email to all users
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // Use TLS
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_USER, // Your email address
                    pass: process.env.EMAIL_PASS, // Your email password or app password
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: emailAddresses, // Send to all users
                subject: "New Course Available: " + title,
                html: `
                    <h1>New Course Alert!</h1>
                    <p>We are excited to announce a new course: <strong>${title}</strong>.</p>
                    <p>${description}</p>
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Price:</strong> ₹${price}</p>
                    <p>Enroll now and start learning!</p>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error in createCourseController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseModel.find({})
        // .populate("createdBy", "-password").lean().exec()
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const updateCourse = async (req, res, next) => {

    const { id } = req.params
    const { title, description, price, category, thumbnail } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            error: errors.array()
        })
    }
    try {
        const course = await updateCourses(
            id,
            { title, description, price, category, thumbnail },
            { new: true, runValidators: true }
        )
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const deleteCourse = async (req, res, next) => {
    const { id } = req.params
    try {
        const course = await courseModel.findByIdAndDelete(id)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export {getAllUsers, createCourse, getAllCourses, 
    updateCourse, deleteCourse, updateUser, deleteUser,
    createUser }