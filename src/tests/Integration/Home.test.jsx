import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../../pages/Home";

// Suppress specific React console warning about duplicate keys
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
    if (
      typeof msg === "string" &&
      msg.includes("Encountered two children with the same key")
    ) {
      return;
    }
    console.error(msg, ...args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

// Mock child components
jest.mock("../../components/CountryCard", () => ({ country }) => (
  <div data-testid="country-card">{country.name.common}</div>
));
jest.mock("../../components/Header", () => () => (
  <div data-testid="header">Header</div>
));
jest.mock(
  "../../components/SearchBar",
  () =>
    ({ searchTerm, setSearchTerm }) =>
      (
        <input
          data-testid="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )
);
jest.mock(
  "../../components/FilterDropdown",
  () =>
    ({
      selectedRegion,
      setSelectedRegion,
      selectedLanguage,
      setSelectedLanguage,
      regions = [],
      languageOptions = [],
    }) =>
      (
        <div>
          <select
            data-testid="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            data-testid="language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languageOptions.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      )
);
jest.mock("../../components/LoadingSpinner", () => () => (
  <div data-testid="spinner">Loading...</div>
));

// Helper: mock fetch
const mockFetch = (data, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    })
  );
};

describe("Home Page Integration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading spinner, then country cards", async () => {
    const fakeCountries = [
      {
        cca3: "USA",
        name: { common: "United States" },
        languages: { eng: "English" },
      },
      {
        cca3: "FRA",
        name: { common: "France" },
        languages: { fra: "French" },
      },
    ];
    mockFetch(fakeCountries);

    render(<Home />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    const countryCards = screen.getAllByTestId("country-card");
    expect(countryCards).toHaveLength(2);
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    mockFetch({ message: "Error" }, false); // Simulate failed fetch

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch countries")).toBeInTheDocument();
    });
  });
});
