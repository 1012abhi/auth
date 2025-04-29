// src/components/CourseList.jsx
import React from "react";
import CohortCard from "./CohortCard";

const CourseList = () => {
  const courses = [
    {
      image: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png",
      title: "Complete Web Development + Devops + Blockchain Cohort",
      price: 5989,
      originalPrice: 8499,
      discount: 29.53,
    },
    {
      image: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png",
      title: "Complete Web Development + Devops Cohort",
      price: 4989,
      originalPrice: 5999,
      discount: 16.84,
    },
    {
      image: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png",
      title: "Complete Web3/Blockchain Cohort",
      price: 4989,
      originalPrice: 5999,
      discount: 16.84,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Available Cohorts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {courses.map((course, idx) => (
          <CohortCard key={idx} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
