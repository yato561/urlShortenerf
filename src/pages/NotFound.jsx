import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-darkBg text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl mb-6">Page Not Found</p>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/dashboard" 
          className="bg-primary hover:bg-green-600 px-6 py-3 rounded text-black font-semibold transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
