/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiLink, FiBarChart2, FiSettings } from "react-icons/fi";

export default function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: FiHome },
        { path: "/my-urls", label: "My URLs", icon: FiLink },
        { path: "/analytics", label: "Analytics", icon: FiBarChart2 },
        { path: "/settings", label: "Settings", icon: FiSettings },
    ];

    return (
        <div className="w-64 bg-darkCard h-screen p-6 border-r border-gray-800 fixed left-0 top-0">
            {/* Logo */}
            <div className="mb-8">
                <div className="text-primary text-2xl font-bold flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
                    Dashboard
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                active
                                    ? "bg-primary bg-opacity-20 text-primary border-l-4 border-primary"
                                    : "text-gray-300 hover:text-primary hover:bg-gray-800"
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}