import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "../../pages/CountryDetail";
import { AuthProvider } from "../../context/AuthContext";

// Use fetchMock from jest-fetch-mock
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("fetches and displays country details and neighbors", async () => {
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
    cca3: "IND",
  };

  const mockNeighbors = [
    {
      name: { common: "Pakistan" },
      cca3: "PAK",
      flags: { svg: "https://flagcdn.com/pk.svg" },
    },
    {
      name: { common: "China" },
      cca3: "CHN",
      flags: { svg: "https://flagcdn.com/cn.svg" },
    },
  ];

  fetchMock.mockResponses(
    [JSON.stringify([mockCountry]), { status: 200 }],
    [JSON.stringify(mockNeighbors), { status: 200 }]
  );

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/country/IND"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  await waitFor(() => screen.getByText("India"));

  expect(screen.getByText("India")).toBeInTheDocument();
  expect(screen.getByText("New Delhi")).toBeInTheDocument();
  expect(screen.getByAltText("India flag")).toBeInTheDocument();

  expect(screen.getByText("Pakistan")).toBeInTheDocument();
  expect(screen.getByText("China")).toBeInTheDocument();
  expect(screen.getByAltText("Pakistan flag")).toBeInTheDocument();
  expect(screen.getByAltText("China flag")).toBeInTheDocument();
});

test("shows an error message when fetch fails", async () => {
  fetchMock.mockReject(new Error("Failed to fetch country data"));

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/country/IND"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  await waitFor(() => screen.getByText(/Failed to fetch country data/i));

  expect(screen.getByText(/Failed to fetch country data/i)).toBeInTheDocument();
});
