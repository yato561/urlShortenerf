import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/AnalyticsChart";
import api from "../api/axiosClient";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Analytics() {
    const [analytics, setAnalytics] = useState([]);
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock device data
    const [topDevices] = useState([
        { id: "desktop", name: "Desktop", value: 38, color: "#1DB954" },
        { id: "mobile", name: "Mobile", value: 51, color: "#FF6B6B" },
        { id: "tablet", name: "Tablet", value: 8, color: "#4ECDC4" },
        { id: "other", name: "Other", value: 3, color: "#95E1D3" },
    ]);

    // Mock referrer data
    const [topReferrers] = useState([
        { id: "loge", name: "@loge.com", percentage: 45 },
        { id: "owes", name: "owes.com", percentage: 28 },
        { id: "liveblobs", name: "liveblobs.com", percentage: 18 },
        { id: "other-ref", name: "other.com", percentage: 9 },
    ]);

    // Fetch all user URLs
    const fetchUrls = async () => {
        try {
            console.log("📊 Fetching URLs for analytics...");
            const res = await api.get("/urls/all");
            const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
            setUrls(data);
            console.log("✓ URLs fetched:", data.length);
        } catch (err) {
            console.error("❌ Error fetching URLs:", err);
            setError("Failed to load analytics");
        }
    };

    // Fetch analytics (mock until backend endpoint is created)
    const fetchAnalytics = async () => {
        try {
            console.log("📈 Generating analytics data...");
            setAnalytics([
                { date: "Jan 1", clicks: 3 },
                { date: "Jan 2", clicks: 7 },
                { date: "Jan 3", clicks: 2 },
                { date: "Jan 4", clicks: 5 },
                { date: "Jan 5", clicks: 12 },
                { date: "Jan 6", clicks: 8 },
                { date: "Jan 7", clicks: 15 },
            ]);
            console.log("✓ Analytics data generated");
        } catch (err) {
            console.error("❌ Error generating analytics:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchUrls(), fetchAnalytics()]);
            setLoading(false);
        };
        loadData();
    }, []);

    // Summary values
    const totalClicks = urls.reduce((sum, u) => sum + (u.clickCount || 0), 0);

    const topUrl = urls.length
        ? urls.reduce((best, u) => ((u.clickCount || 0) > (best.clickCount || 0) ? u : best), urls[0])
        : null;

    return (
        <div className="flex bg-darkBg min-h-screen text-white">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                <Navbar />

                <div className="p-10">

                    <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

                    {error && (
                        <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <p className="text-gray-400">Loading analytics...</p>
                    ) : (
                        <>
                            {/* Stats summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                                <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Clicks</h3>
                                    <p className="text-4xl font-bold text-primary">{totalClicks}</p>
                                </div>

                                <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Total URLs</h3>
                                    <p className="text-4xl font-bold text-primary">{urls.length}</p>
                                </div>

                                <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Top Performing URL</h3>
                                    {topUrl ? (
                                        <div className="mt-2">
                                            <p className="text-primary font-mono font-semibold">{topUrl.shortCode}</p>
                                            <p className="text-gray-400 text-sm">{topUrl.clickCount || 0} clicks</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 mt-2">No data yet</p>
                                    )}
                                </div>
                            </div>

                            {/* Line Chart */}
                            {analytics.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="text-2xl font-semibold mb-4">Clicks per Day</h2>
                                    <AnalyticsChart data={analytics} />
                                </div>
                            )}

                            {/* Bottom Section - Top Devices & Referrers */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                
                                {/* Top Devices */}
                                <div className="bg-darkCard p-6 rounded-lg border border-gray-700">
                                    <h2 className="text-xl font-semibold mb-6">Top Devices</h2>
                                    
                                    <div className="flex items-center justify-between">
                                        {/* Pie Chart */}
                                        <div className="w-40 h-40">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={topDevices}
                                                        innerRadius={50}
                                                        outerRadius={70}
                                                        dataKey="value"
                                                        startAngle={90}
                                                        endAngle={450}
                                                    >
                                                        {topDevices.map((entry) => (
                                                            <Cell key={entry.id} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* Legend */}
                                        <div className="space-y-3">
                                            {topDevices.map((device) => (
                                                <div key={device.id} className="flex items-center gap-2">
                                                    <div 
                                                        className="w-3 h-3 rounded-full" 
                                                        style={{ backgroundColor: device.color }}
                                                    ></div>
                                                    <span className="text-gray-300">{device.name}</span>
                                                    <span className="text-primary font-semibold ml-2">{device.value}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Top Referrers */}
                                <div className="bg-darkCard p-6 rounded-lg border border-gray-700">
                                    <h2 className="text-xl font-semibold mb-6">Top Referrers</h2>
                                    
                                    <div className="space-y-4">
                                        {topReferrers.map((referrer) => (
                                            <div key={referrer.id} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-300">{referrer.name}</span>
                                                    <span className="text-primary font-semibold">{referrer.percentage}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-primary to-green-500"
                                                        style={{ width: `${referrer.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* URL Click Breakdown */}
                            {urls.length > 0 && (
                                <>
                                    <h2 className="text-2xl font-semibold mt-10 mb-4">URL Click Breakdown</h2>

                                    <div className="grid gap-4">
                                        {urls.map((u) => (
                                            <div 
                                                key={u.id} 
                                                className="bg-darkCard p-4 rounded-lg border border-gray-700 hover:border-primary transition"
                                            >
                                                <div className="text-gray-300 truncate text-sm">{u.longUrl}</div>
                                                <div className="text-primary font-mono font-medium mt-1">{u.shortCode}</div>
                                                <div className="text-gray-400 text-sm mt-1">
                                                    <span className="text-green-400">📊 {u.clickCount || 0}</span> clicks
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {urls.length === 0 && (
                                <div className="bg-darkCard p-6 rounded-lg border border-gray-700 text-center mt-10">
                                    <p className="text-gray-400">No URLs created yet. Create one to see analytics!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
