/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-darkBg text-white overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Navbar - Sticky at top */}
        <Navbar />
        
        {/* Page content - scrollable */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
