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
    <nav className="w-full bg-darkBg text-white px-8 py-4 flex justify-between items-center border-b border-gray-700 ml-64">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
        <h1 className="text-xl font-bold text-primary">URLShortener</h1>
      </div>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-white font-semibold"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </nav>
  );
}