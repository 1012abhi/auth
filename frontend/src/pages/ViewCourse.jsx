import React from "react";
import Navbar from "./Navbar";

const ViewCourse = () => {
  return (<>
  <div className="px-6 bg-blue-700 text-center">
    <div className=" bg-white rounded-2xl p-1 shadow-md">
      <Navbar />
    </div>
    <div className="min-h-screen bg-blue-700 flex flex-col md:flex-row justify-center items-center p-6 gap-40">
      {/* Left side */}
      <div className="text-white max-w-lg space-y-6">
        <h1 className="text-4xl font-bold">
          Complete Web <br />
          Development + Devops + <br />
          Blockchain Cohort
        </h1>

        <div className="bg-white p-6 rounded-lg mt-8 text-blue-700">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="space-y-2">
            <p className="font-semibold">Description</p>
            <p>
              Complete syllabus -{" "}
              <a
                href="https://blog.100xdevs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://blog.100xdevs.com/
              </a>
            </p>
            <p className="mt-4 font-semibold">
              Starts 2nd August 2024
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-96 mt-10 md:mt-0 md:ml-10">
        <img
          src="https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.07833836520330406.png"
          alt="Cohort"
          className="w-full h-60 object-cover"
        />

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">PRICE</p>
              <p className="text-2xl font-bold">₹5,989 <span className="line-through text-gray-400 text-base ml-2">₹8,499</span></p>
            </div>
            <div className="text-green-500 font-semibold text-lg">
              29.53% off
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-600 text-sm">Choose Currency:</label>
            <select className="border border-gray-300 p-2 rounded">
              <option>INR</option>
              {/* Other currency options if needed */}
            </select>
          </div>

          <button className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out">
            Buy Now
          </button>

          <button className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out">
            Pay via Crypto
          </button>
        </div>
      </div>
    </div>
  </div>
  </>

  );
};

export default ViewCourse;
