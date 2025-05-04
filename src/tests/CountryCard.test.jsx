// src/tests/CountryCard.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "../components/CountryCard";

describe("CountryCard Component", () => {
  const mockCountry = {
    cca3: "USA",
    name: { common: "United States of America" },
    flags: { svg: "https://flagcdn.com/us.svg" },
    capital: ["Washington, D.C."],
    population: 331002651,
    region: "Americas",
    languages: { eng: "English", spa: "Spanish" },
  };

  it("renders country card with correct information", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    // Test for the country name
    expect(screen.getByText(/United States of America/i)).toBeInTheDocument();

    // Test for the capital
    expect(
      screen.getByText(
        (_, el) => el.textContent === "Capital: Washington, D.C."
      )
    ).toBeInTheDocument();

    // Test for the population
    expect(
      screen.getByText((_, el) => el.textContent === "Population: 331,002,651")
    ).toBeInTheDocument();

    // Test for the region
    expect(
      screen.getByText((_, el) => el.textContent === "Region: Americas")
    ).toBeInTheDocument();

    // Test for the languages
    expect(
      screen.getByText(
        (_, el) => el.textContent === "Languages: English, Spanish"
      )
    ).toBeInTheDocument();
  });

  it("links to the correct country page", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    const countryLink = screen.getByRole("link");
    expect(countryLink).toHaveAttribute("href", "/country/USA");
  });
});
