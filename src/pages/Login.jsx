import { useState, useContext } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login(){
    const { login } = useAuth();
    const { login: contextLogin } = useContext(AuthContext);
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async() => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }
        
        try {
            setLoading(true);
            setError("");
            const data = await login(email, password);
            contextLogin(data.token);
            nav("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex items-center justify-center h-screen bg-darkBg">
            <div className="bg-darkCard p-10 rounded-xl w-96 shadow-lg border border-gray-700">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-500 rounded-full"></div>
                    <h1 className="text-2xl font-bold text-primary">URLShortener</h1>
                </div>
                <h2 className="text-lg mb-6 font-semibold text-center text-gray-300">Login to your account</h2>
                
                {error && (
                    <div className="bg-red-900 p-3 rounded mb-4 text-red-200 text-sm">
                        {error}
                    </div>
                )}
                
                <Input 
                    label="Email" 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <Input 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                <Button onClick={submit} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
                <p className="text-gray-400 text-sm mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-green-400">Register</Link>
                </p>
            </div>
        </div>
    );
}