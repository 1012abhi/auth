import React from "react";
import {
  User,
  Star,
  Rocket,
  Globe,
  ClipboardList,
  FileText,
} from "lucide-react";
import About from "./About";
import CourseList from "../components/CourseList";
import Navbar from "./Navbar";

const features = [
  {
    title: "Learn from the best",
    description:
      "Harkirat is the best in India when it comes to learning about remote work and open source",
    icon: <User className="w-6 h-6 text-black" />,
    borderColor: "border-l-purple-600",
  },
  {
    title: "Beginner friendly",
    description:
      "Start from the basics and go deep into the technology using projects",
    icon: <Star className="w-6 h-6 text-black" />,
    borderColor: "border-l-red-500",
  },
  {
    title: "Reach your inflection point",
    description: "Become a self sufficient developer in tech",
    icon: <Rocket className="w-6 h-6 text-black" />,
    borderColor: "border-l-yellow-500",
  },
  {
    title: "Open source",
    description: "Helping you make your first open source contribution",
    icon: <Globe className="w-6 h-6 text-black" />,
    borderColor: "border-l-yellow-500",
  },
  {
    title: "Version control",
    description:
      "Helping you understand the basics of how version control is implemented in the industry",
    icon: <ClipboardList className="w-6 h-6 text-black" />,
    borderColor: "border-l-purple-600",
  },
  {
    title: "Assignments",
    description:
      "Harkirat has personally created assignments after every week of study, so it’s extremely hands on",
    icon: <FileText className="w-6 h-6 text-black" />,
    borderColor: "border-l-red-500",
  },
];

const Home = () => {
  return (
    <div className="px-6 bg-white text-center">
        <div className=" bg-white rounded-2xl p-1 shadow-md mb-4">
          <Navbar />
        </div>
        <div>
        <CourseList />
        </div>
      <h2 className="text-3xl font-bold mb-10">Why 100xdevs?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`flex gap-4 items-start border-l-4 ${item.borderColor} p-4 shadow-md rounded-md bg-white`}
          >
            <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
            <div className="text-left">
              <h3 className="font-semibold text-md mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
        <div >
          <About />
        </div>
    </div>
  );
};

export default Home;
