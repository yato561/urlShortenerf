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
        <div className="flex items-center justify-center h-screen">
            <div className="bg-darkCard p-10 rounded-xl w-96 shadow-lg">
                <h1 className="text-2xl mb-6 font-semibold text-center">Welcome back</h1>
                
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
                    Don't have an account? <Link to="/register" className="text-primary">Register</Link>
                </p>
            </div>
        </div>
    );
}