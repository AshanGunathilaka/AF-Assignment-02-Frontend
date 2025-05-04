import React from "react"; // Add this import
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  const mockSetSearchTerm = jest.fn();

  it("renders the search input field", () => {
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByPlaceholderText(/Search by country name.../i);
    expect(input).toBeInTheDocument();
  });

  it("calls setSearchTerm when typing in the input field", () => {
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByPlaceholderText(/Search by country name.../i);
    fireEvent.change(input, { target: { value: "Germany" } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Germany");
  });
});
