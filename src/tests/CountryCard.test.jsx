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

  const renderCard = () =>
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} index={0} />
      </BrowserRouter>
    );

  it("renders country name", () => {
    renderCard();
    expect(
      screen.getByRole("heading", { name: /United States of America/i })
    ).toBeInTheDocument();
  });

  it("renders capital, population, region, and languages", () => {
    renderCard();

    // Use `getByText` with the value only, since labels are separate elements
    expect(screen.getByText("Washington, D.C.")).toBeInTheDocument();
    expect(screen.getByText("331,002,651")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("English, Spanish")).toBeInTheDocument();
  });

  it("renders all info block labels", () => {
    renderCard();

    expect(screen.getByText("Population")).toBeInTheDocument();
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("Capital")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  it("links to the correct country page", () => {
    renderCard();
    const countryLink = screen.getByRole("link");
    expect(countryLink).toHaveAttribute("href", "/country/USA");
  });

  it("renders the flag image", () => {
    renderCard();
    const flag = screen.getByRole("img");
    expect(flag).toHaveAttribute("src", "https://flagcdn.com/us.svg");
    expect(flag).toHaveAttribute("alt", "United States of America");
  });
});
