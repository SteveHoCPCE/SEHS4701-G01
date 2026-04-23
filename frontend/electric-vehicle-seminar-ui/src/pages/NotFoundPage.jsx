// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="bg-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-900 transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
