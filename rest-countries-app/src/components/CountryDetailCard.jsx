import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
} from "../services/favorites";
import { useAuth } from "../context/AuthContext";

// Reusable InfoCard component
function InfoCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600">{icon}</div>
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </h4>
          <p className="text-gray-800 font-medium">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CountryDetailsCard({
  country,
  neighbors,
  neighborsLoading,
  itemVariants,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated) return;

      try {
        const status = await checkFavorite(country.cca3);
        setIsFavorite(status);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [country, isAuthenticated]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(country);
      } else {
        await addToFavorites(country);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
      }}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Flag Header Section */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
          >
            {country.name.common}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/90 mt-1"
          >
            {country.name.official}
          </motion.p>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Country Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                title="Capital"
                value={country.capital?.[0] || "N/A"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                }
              />
              <InfoCard
                title="Population"
                value={country.population.toLocaleString()}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
              />
              <InfoCard
                title="Area"
                value={`${country.area.toLocaleString()} km²`}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                }
              />
              <InfoCard
                title="Region"
                value={country.region}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <InfoCard
                title="Subregion"
                value={country.subregion || "N/A"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                }
              />
              <InfoCard
                title="Start of Week"
                value={country.startOfWeek || "N/A"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.languages ? (
                Object.values(country.languages).map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>

          {/* Timezones */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Timezones
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.timezones ? (
                country.timezones.map((tz) => (
                  <span
                    key={tz}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {tz}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleToggleFavorite}
              className={`mt-4 px-6 py-2 rounded-md flex items-center justify-center w-60 ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
            >
              {isFavorite ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove from Favorites
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Favorites
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Right Column - Additional Info */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Currencies */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Currencies
            </h3>
            {country.currencies ? (
              <ul className="space-y-2">
                {Object.entries(country.currencies).map(([code, currency]) => (
                  <li
                    key={code}
                    className="p-3 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-green-800">
                        {currency.name} ({currency.symbol || "No symbol"})
                      </span>
                      <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        {code}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>

          {/* Coat of Arms */}
          {country.coatOfArms?.svg && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Coat of Arms
              </h3>
              <div className="flex justify-center">
                <img
                  src={country.coatOfArms.svg}
                  alt={`${country.name.common} coat of arms`}
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          )}

          {/* Border Countries */}
          {country.borders?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Neighboring Countries
              </h3>
              {neighborsLoading ? (
                <div className="flex justify-center">
                  <LoadingSpinner size="small" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {neighbors.map((neighbor) => (
                    <Link
                      key={neighbor.cca3}
                      to={`/country/${neighbor.cca3}`}
                      className="block"
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={neighbor.flags.svg}
                            alt={`${neighbor.name.common} flag`}
                            className="w-8 h-6 object-cover rounded"
                          />
                          <span className="font-medium text-gray-800 truncate">
                            {neighbor.name.common}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CountryDetailsCard;
