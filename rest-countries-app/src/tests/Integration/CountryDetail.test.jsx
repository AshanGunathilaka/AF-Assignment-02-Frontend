import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "../../pages/CountryDetail";

// Reset fetch mocks before each test
beforeEach(() => {
  fetch.resetMocks();
});

test("fetches and displays country details", async () => {
  const mockCountry = {
    name: { common: "India", official: "Republic of India" },
    capital: ["New Delhi"],
    region: "Asia",
    subregion: "Southern Asia",
    population: 1393409038,
    flags: { svg: "https://flagcdn.com/in.svg" },
    area: 3287263,
    tld: [".in"],
    timezones: ["UTC+05:30"],
    startOfWeek: "monday",
    languages: { hin: "Hindi", eng: "English" },
    currencies: { INR: { name: "Indian Rupee", symbol: "₹" } },
    borders: ["PAK", "CHN"],
    coatOfArms: { svg: "https://example.com/coat.svg" },
  };

  fetch.mockResponseOnce(JSON.stringify([mockCountry]));

  render(
    <MemoryRouter initialEntries={["/country/IND"]}>
      <Routes>
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Optionally check for loading spinner if you add data-testid in your component
  // expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

  await waitFor(() => screen.getByText("India"));

  expect(screen.getByText("India")).toBeInTheDocument();
  expect(screen.getByText("New Delhi")).toBeInTheDocument();
  expect(screen.getByAltText("India flag")).toBeInTheDocument();
});

test("shows an error message when fetch fails", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  render(
    <MemoryRouter initialEntries={["/country/IND"]}>
      <Routes>
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the error message to appear
  await waitFor(() => screen.getByText(/Failed to fetch country data/i), {
    timeout: 5000,
  });

  expect(screen.getByText(/Failed to fetch country data/i)).toBeInTheDocument();
});
