const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
