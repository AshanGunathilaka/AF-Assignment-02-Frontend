import axios from "axios";

// Add a country to favorites
export const addToFavorites = async (country) => {
  try {
    const favoriteData = {
      countryCode: country.cca3,
      countryName: country.name.common,
      flagUrl: country.flags.svg,
    };

    const response = await axios.post("/favorites", favoriteData);
    return response.data;
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

// Get all favorite countries
export const getFavorites = async () => {
  try {
    const response = await axios.get("/favorites");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

// Remove a country from favorites
export const removeFromFavorites = async (countryCode) => {
  try {
    const response = await axios.delete(`/favorites/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

// Check if a country is in favorites
export const checkFavorite = async (countryCode) => {
  try {
    const response = await axios.get(`/favorites/${countryCode}`);
    return response.data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};
