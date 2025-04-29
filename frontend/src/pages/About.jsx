import React from "react";
import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white px-4 md:px-10 py-12">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center mb-6">About 100xDevs</h2>

      {/* Gradient Box */}
      <div className="bg-gradient-to-r from-purple-100 to-orange-200 p-6 md:p-10 rounded-2xl max-w-4xl mx-auto text-center text-gray-800">
        <p className="mb-4">
          Welcome to 100xdevs.
        </p>
        <p className="mb-4">
          This is an initiative by <strong>Harkirat Singh</strong> to personally mentor folks in the field of Programming.
        </p>
        <p className="mb-4">
          Harkirat strongly feels that today you are either a 1x engineer or a 100x engineer and nothing in the middle, and his hope is to take everyone in this community to be a <strong>100x Engineer</strong>.
        </p>
        <p>
          Join him in his first course on Full Stack development with a heavy focus on Open source projects to learn programming practically.
        </p>
      </div>

      {/* Footer */}
      <div className="bg-blue-100 mt-12 p-6 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Image */}
        <img
          src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" // Replace with actual path
          alt="Harkirat Singh"
          className="w-28 h-28 rounded-full object-cover"
        />

        {/* Middle: Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
          <ul className="text-blue-600 space-y-1 underline">
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refunds & Cancellation Policy</a></li>
          </ul>
        </div>

        {/* Right: App & Social */}
        <div className="text-center md:text-left space-y-2">
          <h3 className="font-semibold text-lg">Download App</h3>
          <img
            src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
            alt="Google Play"
            className="w-32 mx-auto md:mx-0"
          />
          <p className="font-semibold mt-2">Follow us</p>
          <div className="flex gap-4 justify-center md:justify-start mt-1 text-black">
            <Twitter className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
