import { useState } from "react";
import { FiCopy, FiEdit2, FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";

function UrlCard({ url, onDelete, onEdit }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const shortUrl = `${globalThis.location.origin}/${url.shortCode}`;
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy:", err);
    }
  };

  return (
    <div className="bg-darkCard p-4 rounded-lg border border-gray-800 flex justify-between items-center hover:border-primary transition">
      <div className="flex-1">
        <p className="text-lg font-semibold text-primary font-mono">{url.shortCode}</p>
        <p className="text-sm text-gray-400 truncate">{url.longUrl}</p>
        <p className="text-sm text-green-400">📊 Clicks: {url.clickCount || 0}</p>
        {url.expiry && (
          <p className="text-xs text-yellow-400 mt-1">⏱️ Expires: {new Date(url.expiry).toLocaleDateString()}</p>
        )}
      </div>

      <div className="flex gap-2 ml-4">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded transition text-sm font-medium ${
            copied 
              ? "bg-green-600 text-white" 
              : "bg-primary hover:bg-green-600 text-darkBg"
          }`}
          onClick={handleCopy}
          title="Copy short URL"
        >
          <FiCopy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition text-sm font-medium text-white"
          onClick={() => onEdit?.(url)}
          title="Edit expiry"
        >
          <FiEdit2 size={16} />
          Edit
        </button>

        <button 
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition text-sm font-medium text-white"
          onClick={() => onDelete(url.id)}
          title="Delete URL"
        >
          <FiTrash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}

UrlCard.propTypes = {
  url: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    shortCode: PropTypes.string.isRequired,
    longUrl: PropTypes.string.isRequired,
    clickCount: PropTypes.number,
    expiry: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

export default UrlCard;