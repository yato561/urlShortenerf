import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import AnalyticsChart from "../components/AnalyticsChart";
import api from "../api/axiosClient";

export default function Dashboard() {
    const [longUrl, setLongUrl] = useState("");
    const [expiry, setExpiry] = useState("");
    const [urls, setUrls] = useState([]);
    const [createdUrl, setCreatedUrl] = useState(null);
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
            const res = await api.post("/urls/create", { 
                longUrl, 
                expiry: expiry || null 
            });
            console.log("✓ URL created successfully");
            console.log("Full response:", res);
            console.log("Response data:", res.data);
            
            // Extract the URL data - handle various response formats
            let urlData = res.data;
            
            // Try different ways to get the data
            if (!urlData) {
                urlData = res;
            }
            
            console.log("Final urlData to set:", urlData);
            console.log("Has shortCode?", !!urlData?.shortCode);
            console.log("shortCode value:", urlData?.shortCode);
            
            // Set the created URL - this WILL have the shortCode
            setCreatedUrl(urlData);
            
            setLongUrl("");
            setExpiry("");
            
            // Try to fetch URLs but don't fail if it errors (CORS issue)
            // eslint-disable-next-line no-unused-vars
            fetchUrls().catch(() => {
                console.log("Could not fetch URLs (CORS issue), but URL was created successfully");
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create short URL");
            console.error("❌ Error creating URL:", err);
        } finally {
            setLoading(false);
        }
    };

    // Analytics (Fetch real-time data from backend)
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get("/analytics/overview");
                const data = res.data;
                console.log("📊 Analytics response:", data);
                
                // Backend returns 'dailyClicks' not 'clicksPerDay'
                const dailyData = Array.isArray(data.dailyClicks) ? data.dailyClicks : [];
                console.log("📊 Setting analytics data:", dailyData);
                setAnalytics(dailyData);
            } catch (err) {
                console.error("Error fetching analytics:", err);
                setAnalytics([]);  // Silently fail, don't show error
            }
        };
        fetchAnalytics();
    }, []);

    // Load URL list on first load
    useEffect(() => {
        fetchUrls();
    }, []);

    return (
        <div className="w-full p-4 lg:p-10">

            {/* Create URL Title */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">Create a new short URL</h1>

            {error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* URL Form */}
            <div className="w-full lg:w-96 bg-darkCard p-4 lg:p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
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

            {/* Created URL Result */}
            {createdUrl && (
                <div className="mt-6 p-4 lg:p-6 bg-green-900 bg-opacity-20 border border-green-600 rounded-lg">
                    <p className="text-green-400 font-semibold mb-4 text-sm lg:text-base">✓ Short URL Created!</p>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-400 text-xs lg:text-sm mb-1">Original URL:</p>
                            <p className="text-white break-all font-mono text-xs lg:text-sm">{createdUrl.longUrl}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs lg:text-sm mb-2">Your Short Code:</p>
                            <div className="bg-darkCard p-3 lg:p-4 rounded border border-primary border-2">
                                <p className="text-primary font-mono font-bold text-2xl lg:text-4xl text-center">
                                    {createdUrl?.shortCode}
                                </p>
                            </div>
                        </div>
                        {createdUrl.expiry && (
                            <div>
                                <p className="text-gray-400 text-xs lg:text-sm mb-1">Expires:</p>
                                <p className="text-yellow-400 text-xs lg:text-sm">{new Date(createdUrl.expiry).toLocaleDateString()}</p>
                            </div>
                        )}
                        <div className="pt-4 border-t border-gray-700 space-y-2">
                            <Button onClick={() => {
                                if (!createdUrl?.shortCode) {
                                    alert("Short code not available");
                                    return;
                                }
                                // Use backend API URL for the redirect endpoint
                                const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
                                const fullShortUrl = `${backendUrl}/s/${createdUrl.shortCode}`;
                                navigator.clipboard.writeText(fullShortUrl).then(() => {
                                    alert(`✓ Copied to clipboard!\n${fullShortUrl}`);
                                }).catch(() => {
                                    alert("Failed to copy. You can manually copy: " + fullShortUrl);
                                });
                            }}>
                                📋 Copy Short URL
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* URLs List */}
            <h2 className="mt-10 mb-4 text-lg lg:text-xl font-semibold">My URLs</h2>

            {urls.length === 0 ? (
                <p className="text-gray-400 text-sm">No URLs yet</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-darkCard rounded-lg shadow-lg border border-gray-700 text-xs lg:text-sm">
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
            {analytics.length > 0 ? (
                <AnalyticsChart data={analytics} />
            ) : (
                <div className="bg-darkCard p-6 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">
                        No analytics data yet. Create and share some short URLs to see click trends!
                    </p>
                </div>
            )}
        </div>
    );
}