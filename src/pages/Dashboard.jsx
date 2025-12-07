import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import AnalyticsChart from "../components/AnalyticsChart";
import api from "../api/axiosClient";

export default function Dashboard() {
    const [longUrl, setLongUrl] = useState("");
    const [expiry, setExpiry] = useState("");
    const [urls, setUrls] = useState([]);
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user's URLs
    const fetchUrls = async () => {
        try {
            setError(null);
            const res = await api.get("/urls/all");
            setUrls(Array.isArray(res) ? res : res.data || []);
        } catch (err) {
            setError("Failed to load URLs");
            console.error("Error fetching URLs:", err);
        }
    };

    // Create short URL
    const createUrl = async () => {
        if (!longUrl.trim()) {
            setError("Please enter a URL");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await api.post("/urls/create", { 
                longUrl, 
                expiry: expiry || null 
            });
            setLongUrl("");
            setExpiry("");
            await fetchUrls();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create short URL");
            console.error("Error creating URL:", err);
        } finally {
            setLoading(false);
        }
    };

    // Analytics (Temporary static until backend supports analytics)
    useEffect(() => {
        setAnalytics([
            { date: "2025-01-01", clicks: 3 },
            { date: "2025-01-02", clicks: 7 },
            { date: "2025-01-03", clicks: 2 }
        ]);
    }, []);

    // Load URL list on first load
    useEffect(() => {
        fetchUrls();
    }, []);

    return (
        <div className="flex bg-darkBg min-h-screen text-white">
            
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                <Navbar />

                <div className="flex-1 p-10">

                    {/* Create URL Title */}
                    <h1 className="text-3xl font-bold mb-6">Create a new short URL</h1>

                    {error && (
                        <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400">
                            {error}
                        </div>
                    )}

                    {/* URL Form */}
                    <div className="w-96 bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                        <Input
                            label="Long URL"
                            type="url"
                            placeholder="https://example.com"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            disabled={loading}
                        />

                        <Input
                            type="datetime-local"
                            label="Optional Expiry"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            disabled={loading}
                        />

                        <Button onClick={createUrl} disabled={loading}>
                            {loading ? "Generating..." : "Generate"}
                        </Button>
                    </div>

                    {/* URLs List */}
                    <h2 className="mt-10 mb-4 text-xl font-semibold">My URLs</h2>

                    {urls.length === 0 ? (
                        <p className="text-gray-400">No URLs yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-darkCard rounded-lg shadow-lg border border-gray-700">
                                <thead>
                                    <tr className="text-left text-gray-300 border-b border-gray-700">
                                        <th className="py-4 px-6 font-semibold">Original URL</th>
                                        <th className="py-4 px-6 font-semibold">Short Code</th>
                                        <th className="py-4 px-6 font-semibold">Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls.map((u) => (
                                        <tr key={u.id} className="border-t border-gray-700 hover:bg-gray-900 transition">
                                            <td className="py-4 px-6 truncate text-sm text-gray-300">{u.longUrl}</td>
                                            <td className="text-primary cursor-pointer py-4 px-6 font-mono font-semibold">
                                                {u.shortCode}
                                            </td>
                                            <td className="py-4 px-6 text-green-400 font-semibold">{u.clickCount || 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Analytics Section */}
                    <h2 className="mt-10 mb-4 text-xl font-semibold">Analytics Overview</h2>
                    <AnalyticsChart data={analytics} />
                </div>
            </div>
        </div>
    );
}