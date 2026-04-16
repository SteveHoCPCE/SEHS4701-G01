// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="font-bold text-2xl">ZhongNeng EV</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Leading China's electric vehicle revolution with innovative
              technology and sustainable solutions.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-600">
              <p>Email: info@zhongneng-ev.com</p>
              <p>Phone: +86 400-888-9999</p>
              <p>Address: Beijing, China</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/catalog"
                className="block text-blue-600 hover:underline"
              >
                View EV Models
              </Link>
              <Link
                to="/register"
                className="block text-blue-600 hover:underline"
              >
                Create Account
              </Link>
              <Link to="/login" className="block text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
          © 2026 ZhongNeng Electric Vehicles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
