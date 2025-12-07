import { useState, useContext } from 'react';
import api from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const { login: contextLogin, logout: contextLogout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            console.log("🔐 Attempting login for:", email);
            const res = await api.post("/auth/login", { email, password });
            const token = res.data?.token || res.token;
            
            if (!token) {
                throw new Error("No token received from server");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("jwt", token);
            contextLogin(token); // Sync with context
            
            console.log("✓ Login successful");
            setLoading(false);
            return res.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Login failed";
            console.error("❌ Login error:", errorMsg);
            setError(errorMsg);
            setLoading(false);
            throw err;
        }
    };
    
    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            console.log("📝 Attempting registration for:", email);
            const res = await api.post("/auth/register", { email, password });
            
            // If registration returns a token, auto-login
            if (res.data?.token) {
                const token = res.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("jwt", token);
                contextLogin(token);
                console.log("✓ Registration successful, auto-login completed");
            } else {
                console.log("✓ Registration successful, please login");
            }
            
            setLoading(false);
            return res.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Registration failed";
            console.error("❌ Registration error:", errorMsg);
            setError(errorMsg);
            setLoading(false);
            throw err;
        }
    };

    const logout = () => {
        console.log("🔓 Logging out...");
        localStorage.removeItem("jwt");
        localStorage.removeItem("token");
        contextLogout(); // Sync with context
        console.log("✓ Logout successful");
    };
    
    return {
        login,
        register,
        logout,
        loading,
        error
    };
};