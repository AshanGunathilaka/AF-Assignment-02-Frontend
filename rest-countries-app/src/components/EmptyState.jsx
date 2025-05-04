// components/EmptyState.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyState = ({ title, description, actionText, actionLink, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mb-6"
        >
          {icon}
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          to={actionLink}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
        >
          {actionText}
        </Link>
      </div>
    </motion.div>
  );
};

export default EmptyState;
