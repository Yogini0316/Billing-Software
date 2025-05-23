import React, { useState } from "react";
import { FaHome, FaSearch, FaBell, FaSun, FaMoon, FaExpand, FaSignOutAlt, FaTasks, FaClock } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { MdFamilyRestroom, MdOutlineAddTask, MdAccountBalance } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";
import BillingSoftware from "../Components/BillingSoftware";
import BillingTables from "../Components/BillingTables";
import BarRestaurantDataForm from "../Components/BarRestaurantDataForm";
import RoomBooking from "../Components/RoomBooking";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const navigate = useNavigate()

  const [userProfile] = useState({
    avatarUrl: "https://th.bing.com/th/id/OIP.j0FVBDJ41RMAG_lUJ4zWFgHaEK?rs=1&pid=ImgDetMain",
    name: "Puja Pawar",
    description: "HR Manager",
    email: "puja.pawar@example.com",
    phone: "+123-456-7890",
  });

  const components = [
    { name: "Billing Counter", icon: <TbLayoutDashboard className="text-red-500" />, component: <BillingTables/> },
    { name: "Room Booking", icon: <MdOutlineAddTask className="text-violet-700" />, component: <RoomBooking/> },
  ];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const activeComponentData = components.find((comp) => comp.name === activeComponent);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`flex ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
      {/* Sidebar */}
      <div
        className={`relative p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md transition-all ${
          isMenuOpen ? "w-64" : "w-20"
        } min-h-screen`}  // Sidebar height set to screen height
      >
        {/* Dashboard Header */}
        {isMenuOpen && (
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-zinc-800 bg-clip-text text-transparent">
            Dashboard
          </h2>
        )}

        {/* Sidebar Links */}
        <div className="space-y-2">
          {components.map(({ name, icon }) => (
            <button
              key={name}
              className={`flex items-center p-2 w-full text-left font-semibold rounded ${
                activeComponent === name ? "bg-red-100 text-red-700" : "hover:text-red-500"
              }`}
              onClick={() => setActiveComponent(name)}
            >
              <span className="text-xl">{icon}</span>
              {isMenuOpen && <span className="ml-4">{name}</span>}
            </button>
          ))}
        </div>

        {/* Arrow Icon */}
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoIosArrowBack className="text-xl" /> : <IoIosArrowForward className="text-xl" />}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Navbar */}
        <div className="flex justify-end items-center mb-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <button onClick={toggleFullscreen} className="p-2">
              <FaExpand />
            </button>
            {/* <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button> */}
            <button className="p-2">
              <FaBell />
            </button>
          </div>
        </div>

        {/* Active Component */}
        <div className="flex-1 p-4 rounded shadow-md overflow-y-auto">  {/* Apply overflow here to only the active component */}
          <h2 className="text-2xl font-bold mb-4">{activeComponent}</h2>
          {activeComponentData ? activeComponentData.component : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
