import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { getAllCourses } from "../controller/course.controller.js";

const router = Router()

router.get('/getallcourses', authUser, getAllCourses)

export default router