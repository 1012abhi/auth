import { courseModel } from "../models/course.model.js"
import { validationResult } from 'express-validator'

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseModel.find({})
        console.log("Courses fetched successfully", courses);
        
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

const getCourseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await courseModel.findById(id).populate("createdBy", "-password").lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { getAllCourses, getCourseById };