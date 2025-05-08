import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the useAuth hook
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { name: "John Doe" },
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

describe("Header Component", () => {
  it("renders the header with correct title", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText(/Country Explorer/i)).toBeInTheDocument();
  });

  it("shows welcome message when authenticated", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});

