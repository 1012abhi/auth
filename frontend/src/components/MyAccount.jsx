import React, { useState } from "react";
import { UserCircle } from "lucide-react"; // Optional avatar fallback icon
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const MyAccount = () => {
    const [activeTab, setActiveTab] = useState("Purchases");
    const navigate = useNavigate();
    const tabs = ["Purchases", "General", "Security"];

return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Top Bar */}
      <TopBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    <div className="max-w-6xl mx-auto flex flex-col items-center">
         {/* Tabs */}
      <div className="flex gap-8 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-md pb-2 border-b-2 cursor-pointer ${
              activeTab === tab
                ? "text-blue-600 border-blue-600 font-medium"
                : "text-gray-500 border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
      {/* Content Section */}
      <div className="max-w-3xl mx-auto mt-6 space-y-6 ">
        {activeTab === "Purchases" && <PurchasesTab />}
        {activeTab === "General" && <GeneralTab />}
        {activeTab === "Security" && <SecurityTab />}
      </div>
    </div>
  );
};

const TopBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
      {/* Profile Image */}
      <Link to="/" className="flex items-center gap-2">
      <img 
        // onClick={handleLogoClick}
        src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg" // Replace with your profile image
        alt="profile"
        className="w-12 h-12 rounded-full object-cover"
      />
      
      </Link>

      {/* Logout Button */}
      <button className="bg-black text-white px-6 py-3 rounded-full text-sm cursor-pointer">
        Logout
      </button>
    </div>
  );
};

const PurchasesTab = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">My Purchases</h2>
      <div className="bg-blue-100 text-blue-900 p-4 rounded-2xl">
        No courses purchased
      </div>
    </>
  );
};

const GeneralTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authentication
            },
          });
          const { name, email, phone } = response.data;
          setFullName(name || "");
          setEmail(email || "");
          setPhone(phone || "");
          console.log("User details fetched successfully:", response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

    fetchUserDetails();
  }, []);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/updateuser`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authentication
          },
        }
      );
      alert("Profile updated successfully!");
      console.log("Profile updated successfully:", response.data);
      
      setFullName(response.data.name || "");
      setEmail(response.data.email || "");
      setPhone(response.data.phone || "");
      // Optionally, you can redirect or update the UI based on the response
      // For example, you can navigate to a different page or show a success message
      // navigate("/profile"); // Redirect to profile page
      // Or update the UI with the new user details
      // setUserDetails(response.data); // Assuming you have a state to hold user details
      // console.log("Updated user details:", response.data);

      console.log("Updated user details:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div 
    className="max-w-xl mx-auto mt-10 space-y-6">
      <form action=""
        onSubmit={updateUserProfile}
      >


      {/* Full Name */}
      <InputField
        label="Full Name"
        value={fullName}
        setValue={setFullName}
        onChange={(e) => setFullName(e.target.value)}
        // disabled={!isEditing}
      />

      {/* Email */}
      <InputField
        label="Email"
        value={email}
        setValue={setEmail}
        onChange={(e) => setEmail(e.target.value)}
        // disabled={!isEditing}
      />

      {/* Phone Number */}
      <InputField
        label="Phone Number"
        value={phone}
        setValue={setPhone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // Allow only numbers
        // disabled={!isEditing}
        helperText="Please add country code if you're entering phone number"
      />

      {/* Save Button */}
      <div className="pt-2">
        <button
            // disabled={!isEditing} // Disable button if not editing
            // className={`bg-blue-600 text-white px-8 py-3 rounded-full text-sm cursor-pointer hover:bg-blue-700 ${
            //   disabled ? "opacity-50 cursor-not-allowed" : ""
            // }`}
        //   disabled
          className="bg-blue-400 text-white px-8 py-3 rounded-full text-sm cursor-pointer hover:bg-blue-500"
        >
          Save Profile
        </button>
      </div>
      </form>

    </div>
  );
};

const SecurityTab = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);

  return (
    <div>
        <div className="max-w-xl mx-auto mt-10 space-y-6">
          <div className="max-w-xl mx-auto space-y-6">
              {/* Current Password */}
              <InputField 
                  label="Current Password"
                  value={currentPassword}
                  setValue={setCurrentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  // disabled={!isEditing}
                  
                  />
              <InputField 
                  label="New Password"
                  value={newPassword}
                  setValue={setNewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  // disabled={!isEditing}
                  />
              <InputField 
                  label="Confirm new Password"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // disabled={!isEditing}
              />
              {/* Submit Button */}
              <div className="pt-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm hover:bg-blue-700">
                  Change Password
              </button>
              </div>
          </div>
        </div>
    </div>
  );
};

const InputField = ({ label, value, disabled, helperText, onChange }) => {
    
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-full bg-gray-100 ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-400"
          } outline-none`}
  
      />
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default MyAccount;