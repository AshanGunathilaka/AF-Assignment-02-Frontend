import React from "react"; // Add this import
import { render, screen } from "@testing-library/react";
import Header from "../components/Header"; // Adjust the import path as necessary
describe("Header Component", () => {
  it("renders the header with correct title", () => {
    render(<Header />);
    expect(screen.getByText(/Country Explorer/i)).toBeInTheDocument();
  });
});
