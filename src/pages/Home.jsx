import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountryCard from "../components/CountryCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [languageOptions, setLanguageOptions] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Load all countries initially
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setAllCountries(data);
        setCountries(data);
        updateLanguageOptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // This effect only runs once on component mount

  // Update language options based on region
  const updateLanguageOptions = (countryList) => {
    const langSet = new Set();
    countryList.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => langSet.add(lang));
      }
    });
    setLanguageOptions(["All", ...Array.from(langSet).sort()]);
  };

  // Update countries + language options when region or search changes
  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return; // Prevents double loading during ongoing requests

      setIsLoading(true);
      setError(null);

      try {
        let url = "";

        // Check if there's a search term or region selected
        if (searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm}`;
        } else if (selectedRegion !== "All") {
          url = `https://restcountries.com/v3.1/region/${selectedRegion}`;
        } else {
          url = "https://restcountries.com/v3.1/all";
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
        updateLanguageOptions(data);

        // Reset language selection if it's not available in new list
        const newLangs = new Set();
        data.forEach((c) => {
          if (c.languages) {
            Object.values(c.languages).forEach((l) => newLangs.add(l));
          }
        });
        if (selectedLanguage !== "All" && !newLangs.has(selectedLanguage)) {
          setSelectedLanguage("All");
        }
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce fetch requests to prevent multiple rapid calls
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer); // Clean up the timeout
  }, [searchTerm, selectedRegion, selectedLanguage]);

  // Filter by selected language (client-side)
  const filteredCountries = countries.filter((country) => {
    const matchesLanguage =
      selectedLanguage === "All" ||
      (country.languages &&
        Object.values(country.languages).includes(selectedLanguage));
    return matchesLanguage;
  });

  const handleCountryClick = async (code) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      if (!res.ok) throw new Error("Failed to fetch country details");
      const data = await res.json();
      console.log("Country Detail:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <Header />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Search and Filter Section */}
        <motion.div
          variants={childVariants}
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="w-full lg:w-1/2">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="w-full lg:w-auto">
            <FilterDropdown
              selectedRegion={selectedRegion}
              setSelectedRegion={(region) => {
                setSelectedRegion(region);
                setSelectedLanguage("All");
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              regions={[
                "All",
                "Africa",
                "Americas",
                "Asia",
                "Europe",
                "Oceania",
              ]}
              languageOptions={languageOptions}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <AnimatePresence>
            {/* Results Count */}
            {filteredCountries.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 mb-4"
              >
                Showing {filteredCountries.length} countries
              </motion.p>
            )}

            {/* Countries Grid */}
            {filteredCountries.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                <AnimatePresence>
                  {filteredCountries.map((country, index) => (
                    <motion.div
                      key={country.cca3}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleCountryClick(country.cca3)}
                      whileHover={{ y: -5 }}
                    >
                      <CountryCard country={country} index={index} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v2m0 4v2m0 4v2m0 4v2m14-12V3m0 4V7m0 4v2m0 4v2m-7-7h2m4 0h2m-4 0v2m4 0v2m-4 0v2m4 0v2m-7-7h2"
                    ></path>
                  </svg>
                  <p className="text-gray-400 text-xl">No results found</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Home;
