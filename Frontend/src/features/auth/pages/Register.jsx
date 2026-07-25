import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  // Show loading spinner only when loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-slate-600">Signing in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      {/* Simple Card Container */}
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-600 mt-2">Join us today and get started</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50`}
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50`}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50`}
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <Link to="/login" className="text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <button className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
              Sign in
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-slate-500">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
