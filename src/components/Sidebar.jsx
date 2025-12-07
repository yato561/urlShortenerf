/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiLink, FiBarChart2, FiSettings, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: FiHome },
        { path: "/my-urls", label: "My URLs", icon: FiLink },
        { path: "/analytics", label: "Analytics", icon: FiBarChart2 },
        { path: "/settings", label: "Settings", icon: FiSettings },
    ];

    const NavContent = () => (
        <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-l-4 ${
                            active
                                ? "bg-transparent text-primary border-primary"
                                : "text-gray-300 border-transparent hover:text-primary hover:bg-gray-700"
                        }`}
                    >
                        <Icon size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* MOBILE HEADER */}
            <div className="lg:hidden flex items-center justify-between bg-darkCard px-4 py-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
                    <span className="text-white font-semibold text-sm">URLShortener</span>
                </div>

                <button
                    onClick={() => setMobileOpen(true)}
                    className="text-white p-2 hover:bg-gray-700 rounded transition"
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* MOBILE OVERLAY MENU */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="fixed top-0 left-0 h-full w-64 bg-darkCard p-6 border-r border-gray-700 z-50 lg:hidden flex flex-col">
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-white mb-6 p-2 hover:bg-gray-700 rounded transition self-end"
                        >
                            <FiX size={24} />
                        </button>

                        {/* Logo */}
                        <div className="mb-8 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
                                <span className="text-lg font-semibold text-white">URLShortener</span>
                            </div>
                        </div>

                        <NavContent />
                    </div>
                </>
            )}

            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:flex flex-col h-screen w-64 bg-darkCard border-r border-gray-800 overflow-y-auto">
                
                {/* Logo */}
                <div className="mb-8 flex-shrink-0 p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
                        <span className="text-lg font-semibold text-white">URLShortener</span>
                    </div>
                </div>

                <div className="px-6 flex-1 flex flex-col">
                    <NavContent />
                </div>
            </div>
        </>
    );
}
