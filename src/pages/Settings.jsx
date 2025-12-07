import { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    if (globalThis.confirm("Are you sure you want to logout?")) {
      logout();
      nav("/login");
    }
  };

  return (
    <div className="flex bg-darkBg min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
        <main className="p-10 text-white">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          {/* Account Settings */}
          <div className="bg-darkCard p-6 rounded-lg border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="jwt-token" className="block text-gray-300 mb-2">JWT Token</label>
                <div className="flex gap-2">
                  <input 
                    id="jwt-token"
                    type="password" 
                    value={localStorage.getItem("token") || ""} 
                    disabled
                    className="flex-1 px-4 py-2 rounded bg-gray-900 border border-gray-700 text-gray-400"
                  />
                  <button 
                    onClick={handleCopyToken}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Store this token securely. Don't share it with anyone.</p>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="bg-darkCard p-6 rounded-lg border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
            
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Base URL:</strong> <code className="bg-gray-900 px-2 py-1 rounded text-primary">{import.meta.env.VITE_API_BASE_URL}</code>
              </p>
              <p className="text-gray-400 text-sm">Environment variable: <code>VITE_API_BASE_URL</code></p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-darkCard p-6 rounded-lg border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold mb-4">Security</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 p-4 rounded">
                <p className="text-yellow-300">
                  <strong>⚠️ Important:</strong> For production, tokens should be stored in httpOnly cookies instead of localStorage.
                </p>
              </div>

              <div>
                <p className="text-gray-300 mb-4">Danger Zone</p>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded transition text-white font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-darkCard p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            
            <div className="space-y-2 text-gray-300">
              <p><strong>Application:</strong> URL Shortener</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Built with:</strong> React + Vite</p>
              <p className="text-sm text-gray-400 mt-4">For support, please contact the development team.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

