import { useState, useContext } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const { login: contextLogin } = useContext(AuthContext);
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async() => {
        if (!email || !password || !confirm) {
            setError("All fields are required");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const data = await register(email, password);
            // Auto-login after registration
            if (data.token) {
                contextLogin(data.token);
                nav("/dashboard");
            } else {
                nav("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
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
                <h2 className="text-lg mb-6 font-semibold text-center text-gray-300">Create your account</h2>

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
                <Input 
                    label="Confirm Password" 
                    type="password" 
                    value={confirm} 
                    onChange={(e) => setConfirm(e.target.value)}
                    disabled={loading}
                />

                <Button onClick={submit} disabled={loading}>
                    {loading ? "Creating..." : "Sign Up"}
                </Button>

                <p className="text-gray-400 text-sm mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-primary hover:text-green-400">Login</Link>
                </p>
            </div>
        </div>
    );
}