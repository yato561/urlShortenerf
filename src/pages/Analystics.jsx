/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AnalyticsChart from "../components/AnalyticsChart";
import api from "../api/axiosClient";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Analytics() {
    const [analytics, setAnalytics] = useState([]);       // clicks per day
    const [urls, setUrls] = useState([]);                 // user's URL list
    const [topDevices, setTopDevices] = useState([]);     // device distribution
    const [topReferrers, setTopReferrers] = useState([]); // referrer distribution
    const [summary, setSummary] = useState(null);         // totalClicks, totalUrls, topUrl
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Device colors
    const deviceColors = {
        Desktop: "#1DB954",
        Mobile: "#FF6B6B",
        Tablet: "#4ECDC4",
        Other: "#95E1D3"
    };

    // Fetch analytics from backend
    const fetchAnalytics = async () => {
        try {
            console.log("📈 Fetching analytics from backend...");
            const res = await api.get("/analytics/overview");
            const data = res.data;
            


            setSummary({
                totalClicks: data.totalClicks,
                totalUrls: data.totalUrls,
                topUrl: data.topUrl
            });

            // clicks per day - backend returns 'dailyClicks'
            const dailyData = data.dailyClicks || [];
            console.log("Daily clicks data:", dailyData);
            setAnalytics(dailyData);

            // devices - handle both raw and formatted formats
            let deviceData = [];
            if (data.devices && Array.isArray(data.devices)) {
                deviceData = data.devices.map((d, idx) => {
                    let name, value;
                    
                    // Handle if devices is formatted like {name, percentage}
                    if (d.name !== undefined) {
                        name = d.name;
                        value = d.percentage || 0;
                    }
                    // Handle if devices is raw [["Desktop", 100], ...]
                    else if (Array.isArray(d)) {
                        [name, value] = d;
                    }
                    // Fallback
                    else {
                        name = String(d);
                        value = 0;
                    }
                    
                    return {
                        id: `device-${name}-${idx}`,
                        name: name || "Unknown",
                        value: value || 0,
                        color: deviceColors[name] || "#1DB954"
                    };
                });
            }
            console.log("Processed devices:", deviceData);
            setTopDevices(deviceData);

            // referrers - ensure unique IDs (format: [{name, percentage}, ...])
            let referrerData = [];
            if (data.referrers && Array.isArray(data.referrers)) {
                referrerData = data.referrers.map((r, idx) => ({
                    id: r.name ? `referrer-${r.name}-${idx}` : `referrer-unknown-${idx}`,
                    name: r.name || "Unknown",
                    percentage: r.percentage || 0
                }));
            }
            console.log("Processed referrers:", referrerData);
            setTopReferrers(referrerData);

            console.log("✓ Analytics loaded");
        } catch (err) {
            console.error("❌ Error loading analytics:", err);
            setError("Failed to load analytics");
        }
    };

    // Fetch user URLs
    const fetchUrls = async () => {
        try {
            console.log("📊 Fetching URLs...");
            const res = await api.get("/urls/all");
            const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
            setUrls(data);
            console.log("✓ URLs loaded:", data.length);
        } catch (err) {
            console.error("❌ Error loading URLs:", err);
            setError("Failed to load URLs");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchAnalytics(), fetchUrls()]);
            setLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className="w-full p-4 lg:p-10">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">Analytics Dashboard</h1>

            {error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-gray-400 text-sm">Loading analytics...</p>
            ) : (
                <>
                    {/* Summary Cards */}
                    {summary && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Clicks</h3>
                                <p className="text-4xl font-bold text-primary">{summary.totalClicks}</p>
                            </div>

                            <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-300 mb-2">Total URLs</h3>
                                <p className="text-4xl font-bold text-primary">{summary.totalUrls}</p>
                            </div>

                            <div className="bg-darkCard p-6 rounded-lg shadow-lg border border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-300 mb-2">Top Performing URL</h3>
                                {summary.topUrl ? (
                                    <div className="mt-2">
                                        <p className="text-primary font-mono font-semibold">{summary.topUrl.shortCode}</p>
                                        <p className="text-gray-400 text-sm">{summary.topUrl.clickCount} clicks</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mt-2">No data</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Clicks per day chart */}
                    {analytics.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold mb-4">Clicks per Day</h2>
                            <AnalyticsChart data={analytics} />
                        </div>
                    )}

                    {/* Devices + Referrers */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Top Devices */}
                        <div className="bg-darkCard p-6 rounded-lg border border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Top Devices</h2>
                            
                            {topDevices.length === 0 ? (
                                <p className="text-gray-400 text-sm">No device data available</p>
                            ) : (
                                <div className="flex items-center justify-between gap-6">

                                    {/* Pie Chart */}
                                    <div style={{ width: 200, height: 200 }}>
                                        <ResponsiveContainer width={200} height={200}>
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
                                                <span className="text-primary font-semibold ml-2">{device.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Referrers */}
                        <div className="bg-darkCard p-6 rounded-lg border border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Top Referrers</h2>
                            
                            {topReferrers.length === 0 ? (
                                <p className="text-gray-400 text-sm">No referrer data available</p>
                            ) : (
                                <div className="space-y-4">
                                    {topReferrers.map((ref) => (
                                        <div key={ref.id} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-300">{ref.name}</span>
                                                <span className="text-primary font-semibold">{ref.percentage}</span>
                                            </div>

                                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-green-500"
                                                    style={{ width: `${ref.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* URL Click Breakdown */}
                    {urls.length > 0 ? (
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
                    ) : (
                        <div className="bg-darkCard p-6 rounded-lg border border-gray-700 text-center mt-10">
                            <p className="text-gray-400">No URLs created yet. Create one to see analytics!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
