/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="w-full bg-darkBg text-white px-4 lg:px-8 py-3 lg:py-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0 gap-4">
      {/* Logo - Hidden on mobile since it's in mobile header */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
        <h1 className="text-xl font-bold text-primary">URLShortener</h1>
      </div>

      {/* Spacer for mobile */}
      <div className="flex-1 lg:flex-none"></div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-1 lg:gap-2 bg-red-600 hover:bg-red-700 px-2 lg:px-4 py-2 rounded-lg transition text-white font-semibold text-sm lg:text-base"
      >
        <FiLogOut size={16} className="lg:w-[18px]" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </nav>
  );
}