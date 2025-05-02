import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100, // Assuming discount is a percentage
    },
    thumbnail: {
        type: String, // URL or file path for the course thumbnail
      },
    duration: {
      type: String, // Duration of the course (e.g., "3 hours", "2 weeks")
      // required: true,
    },
    level: {
      type: String,
      // required: true,
      enum: ["Beginner", "Intermediate", "Advanced"], // Example levels
    },
    prerequisites: {
      type: [String], // Array of strings for prerequisites (e.g., ["Basic Math", "HTML"])
    },
    category: {
      type: String,
      required: true,
      enum: ["Programming", "Design", "Marketing", "Business", "Other"], // Example categories
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

export const courseModel = mongoose.model("Course", courseSchema);
