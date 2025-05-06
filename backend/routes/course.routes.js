import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { getAllCourses, getCourseById } from "../controller/course.controller.js";

const router = Router()

router.get('/getallcourses', authUser, getAllCourses)
router.get('/getcourse/:id', authUser, getCourseById)



export default router