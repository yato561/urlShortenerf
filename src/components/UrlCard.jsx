export default function UrlCard({ url, onDelete, onEdit }) {

  return (
    <div className="bg-darkCard p-4 rounded-lg border border-gray-800 flex justify-between items-center hover:border-primary transition">
      <div className="flex-1">
        <p className="text-lg font-semibold text-primary">{url.shortCode}</p>
        <p className="text-sm text-gray-400 truncate">{url.longUrl}</p>
        <p className="text-sm text-green-400">Clicks: {url.clickCount || 0}</p>
      </div>

      <div className="flex gap-3 ml-4">
        <button 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition text-sm"
          onClick={() => onEdit && onEdit(url)}
        >
          Edit
        </button>

        <button 
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition text-sm"
          onClick={() => onDelete(url.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}