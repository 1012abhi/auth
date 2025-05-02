import {courseModel} from "../models/course.model.js";

export const course = async (courseData) => {
  try {
    // Create a new course instance
    const newCourse = new courseModel(courseData);

    // Save the course to the database
    await newCourse.save();

    return {
      success: true,
      message: "Course created successfully",
      course: newCourse,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return {
      success: false,
      message: "Failed to create course",
      error: error.message,
    };
  }
};

export const updateCourses = async (courseId, courseData) => {
    try {
        // Find the course by ID and update it
        const updatedCourse = await courseModel.findByIdAndUpdate(
            courseId,
            courseData,
            { new: true, runValidators: true } // Return the updated document and run validators
        );  
    
        if (!updatedCourse) {
            return {
                success: false,
                message: "Course not found",
            };
        }
        return {
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
        };

    }
    catch (error) {
        console.error("Error updating course:", error);
        return {
            success: false,
            message: "Failed to update course",
            error: error.message,
        };
    }

}