/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AnalyticsChart({ data }) {
  // Handle empty or invalid data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="bg-darkCard p-6 rounded-lg w-full border border-gray-800 text-center">
        <p className="text-gray-400">No analytics data available yet</p>
      </div>
    );
  }

  // Validate data has required fields
  const validData = data.filter(item => item.date && typeof item.clicks === 'number');
  
  if (validData.length === 0) {
    return (
      <div className="bg-darkCard p-6 rounded-lg w-full border border-gray-800 text-center">
        <p className="text-gray-400">No valid analytics data to display</p>
      </div>
    );
  }

  return (
    <div className="bg-darkCard p-6 rounded-lg w-full border border-gray-800">
      <h2 className="text-white text-xl mb-4">URL Click Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={validData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: "#161B22", border: "1px solid #555" }} />
          <Line type="monotone" dataKey="clicks" stroke="#1DB954" strokeWidth={3} dot={{ fill: "#1DB954" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}