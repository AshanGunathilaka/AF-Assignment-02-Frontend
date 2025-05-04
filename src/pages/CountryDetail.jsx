import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";
import LoadingSpinner from "../components/LoadingSpinner";
import CountryDetailsCard from "../components/CountryDetailCard";

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [neighbors, setNeighbors] = useState([]);
  const [neighborsLoading, setNeighborsLoading] = useState(false);

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error("Failed to fetch country data.");
        const data = await res.json();
        setCountry(data[0]);

        // Fetch neighbor countries if borders exist
        if (data[0]?.borders?.length > 0) {
          fetchNeighbors(data[0].borders);
        } else {
          setNeighbors([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchNeighbors = async (borderCodes) => {
      setNeighborsLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
        );
        if (!res.ok) throw new Error("Failed to fetch neighbor countries.");
        const data = await res.json();
        setNeighbors(data);
      } catch (err) {
        setNeighbors([]);
      } finally {
        setNeighborsLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6"
      >
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <BackButton />
        </div>
      </motion.div>
    );
  }

  if (!country) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <CountryDetailsCard
          country={country}
          neighbors={neighbors}
          neighborsLoading={neighborsLoading}
          itemVariants={itemVariants}
        />
      </div>
    </div>
  );
}

export default CountryDetail;
