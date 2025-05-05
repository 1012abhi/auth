import { Router } from "express";
import { body, param } from 'express-validator'
import { authUser } from "../middleware/auth.middleware.js";
import { createCourse, createUser, deleteCourse, deleteUser, getAllCourses, getAllCoursesByUser, getAllUsers, updateCourse, updateUser } from "../controller/admin.controller.js";
import {isAdmin} from "../middleware/admin.middleware.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router()
router.post('/createuser', authUser, isAdmin, 
    body('name').notEmpty().withMessage('Name is required'), 
    body('email').isEmail().withMessage('Email is required'), 
    body('password').notEmpty().withMessage('Password is required'), 
    body('role').notEmpty().withMessage('Role is required'),
createUser)

router.get('/getallusers', authUser, isAdmin, getAllUsers)
router.put('/updateuser/:id', authUser, isAdmin,
    param('id').isMongoId().withMessage('Invalid user id'), 
    body('name').notEmpty().withMessage('Name is required'), 
    body('email').isEmail().withMessage('Email is required'), 
    body('role').notEmpty().withMessage('Role is required'),
updateUser)
router.delete('/deleteuser/:id', authUser, isAdmin,
    param('id').isMongoId().withMessage('Invalid user id'),
deleteUser)

router.post('/createcourse', authUser, isAdmin,
    upload.single('thumbnail'), 
    body('title').notEmpty().withMessage('title is required'), 
    body('description').notEmpty().withMessage('Description is required'), 
    body('price').isNumeric().withMessage('Price must be a number'), 
    body('category').notEmpty().withMessage('Category is required'), 
    body('thumbnail').notEmpty().withMessage('thumbnail is required'), 
createCourse)
router.get('/getallcourses', authUser, isAdmin, getAllCourses)
router.get('/getcoursesbyadmin/:id', authUser, isAdmin,
    param('id').isMongoId().withMessage('Invalid course id'), 
    getAllCoursesByUser)
router.put('/updatecourse/:id', authUser, isAdmin, 
    param('id').isMongoId().withMessage('Invalid course id'), 
    body('title').notEmpty().withMessage('title is required'), 
    body('description').notEmpty().withMessage('Description is required'), 
    body('price').isNumeric().withMessage('Price must be a number'), 
    body('category').notEmpty().withMessage('Category is required'), 
    body('thumbnail').notEmpty().withMessage('Image is required'), 
updateCourse)
router.delete('/deletecourse/:id', authUser, isAdmin, 
    param('id').isMongoId().withMessage('Invalid course id'), 
deleteCourse)
// router.get('/getcourse/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid course id'), getCourse)

// router.get('/getuser/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid user id'), getUser)  
// router.put('/updateuser/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid user id'), body('name').notEmpty().withMessage('Name is required'), body('email').isEmail().withMessage('Email is required'), body('role').notEmpty().withMessage('Role is required'), updateUser)
// router.delete('/deleteuser/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid user id'), deleteUser)
// router.get('/getallorders', authUser, isAdmin, getAllOrders)
// router.get('/getorder/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid order id'), getOrder)
// router.put('/updateorder/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid order id'), body('status').notEmpty().withMessage('Status is required'), updateOrder)
// router.delete('/deleteorder/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid order id'), deleteOrder)
// router.get('/getallcategories', authUser, isAdmin, getAllCategories)
// router.get('/getcategory/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid category id'), getCategory)
// router.put('/updatecategory/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid category id'), body('name').notEmpty().withMessage('Name is required'), updateCategory)
// router.delete('/deletecategory/:id', authUser, isAdmin, param('id').isMongoId().withMessage('Invalid category id'), deleteCategory)



export default router