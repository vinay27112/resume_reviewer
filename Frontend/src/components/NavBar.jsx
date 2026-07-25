import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Image Logo */}
          <Link to="/" className="shrink-0">
            <h1 className="text-xl font-bold text-gray-800">My App</h1>
          </Link>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
