import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>

      <h1 className="relative text-5xl font-extrabold mb-6 text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
        🌍 Country Explorer
      </h1>

      {/* Auth Buttons */}
      <div className="relative flex justify-center space-x-4 pb-4">
        {isAuthenticated ? (
          <>
            <span className="text-white text-lg font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30">
              Welcome, {user.name}
            </span>
            <Link
              to="/favorites"
              className="text-white hover:text-blue-200 text-lg font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 flex items-center"
            >
              <span className="mr-1">⭐</span> Favorites
            </Link>
            <button
              onClick={logout}
              className="text-white hover:text-blue-200 text-lg font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-blue-200 text-lg font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-blue-200 text-lg font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/30 to-teal-500/30 hover:from-green-600/40 hover:to-teal-600/40 transition-all duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </motion.div>
  );
}

export default Header;
