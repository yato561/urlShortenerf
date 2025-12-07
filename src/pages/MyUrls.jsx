import { useEffect, useState } from "react";
import UrlCard from "../components/UrlCard";
import { get, del, post } from "../api/api";

export default function MyUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUrls = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await get("/urls/all");
      setUrls(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError("Failed to load URLs");
      console.error("Error loading URLs:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (id) => {
    try {
      if (!globalThis.confirm("Delete this URL?")) return;
      await del(`/urls/delete/${id}`);
      await loadUrls();
    } catch (err) {
      setError("Failed to delete URL");
      console.error("Error deleting:", err);
    }
  };

  const editUrl = async (url) => {
    try {
      const newExpiry = globalThis.prompt(
        "Set new expiry (ISO format) or leave empty to remove expiry:",
        url.expiry || ""
      );
      if (newExpiry === null) return;

      // Always send both longUrl and expiry to backend
      await post(`/urls/update/${url.id}`, { 
        longUrl: url.longUrl,
        expiry: newExpiry || null 
      });
      await loadUrls();
    } catch (err) {
      setError("Failed to update URL");
      console.error("Error updating:", err);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  return (
    <div className="w-full p-4 lg:p-10">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">My URLs</h1>

      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-600 p-3 rounded mb-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-gray-400 text-sm">Loading...</p>
      )}

      {!loading && urls.length === 0 && (
        <p className="text-gray-400 text-sm">No URLs yet. Create one to get started!</p>
      )}

      {!loading && urls.length > 0 && (
        <div className="grid gap-3 lg:gap-4">
          {urls.map(url => (
            <UrlCard
              key={url.id}
              url={url}
              onDelete={deleteUrl}
              onEdit={editUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}