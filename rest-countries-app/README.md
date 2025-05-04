# Countries of the World

A modern web application that allows users to explore countries, view detailed information, and save their favorites.

# Table of Contents

- Overview
- Features
- Technologies Used
- Setup and Installation
- Usage
- Testing
- API Documentation
- Challenges and Solutions
- Deployment

# Overview

Countries of the World is a responsive web application that provides information about countries around the world. Users can search for specific countries, filter by region, view detailed information about each country, and save their favorite countries after creating an account.

# Features

- Country Exploration: Browse through all 195 countries with essential information
- Search Functionality: Find countries by name
- Region Filtering: Filter countries by continent
- Country Details: Get comprehensive information about each country
- User Authentication: Register, login, and maintain user profiles
- Favorites Management: Save, view, and manage favorite countries
- Responsive Design: Fully responsive interface for all devices

# Technologies Used

## Frontend

- React 19
- React Router DOM 7
- Tailwind CSS
- Axios for API requests
- Context API for state management

## Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Testing

- Jest
- React Testing Library

## Development & Build Tools

- Vite
- Babel

# Setup and Installation

## Prerequisites

- Node.js
- npm
- MongoDB

## Frontend Setup

## Clone the repository:

bash
https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-AshanGunathilaka

## Install dependencies:

bash
npm install

## Start the development server:

bash
npm run dev

## Backend Setup

## Navigate to the backend directory:

bash
cd backend

## Install dependencies:

bash
npm install

## Start the backend server:

bash
npm run dev

# Usage

## Home Page

- View all countries in a grid layout
- Search for countries by name (requires at least 3 characters)
- Filter countries by region

## Country Details

- Click on any country card to view detailed information
- See additional data such as native name, population, capital, languages, currencies, and border countries
- Add/remove countries from favorites if logged in

## User Authentication

- Register with name, email, and password
- Log in with email and password
- User session persists using JWT tokens

## Favorites

- View all favorite countries in one place
- Remove countries from favorites
- Favorites are stored in the database and associated with your user account

# Testing

## Running Tests

bash
npm test

# API Documentation

## External API

The application uses the REST Countries API to fetch country information.

Endpoints used:

- GET /v3.1/all - Get all countries
- GET /v3.1/name/{name} - Search for countries by name
- GET /v3.1/region/{region} - Filter countries by region
- GET /v3.1/alpha/{code} - Get country by code
  Backend API

## Authentication

- POST /api/users - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile (protected)
- PUT /api/users/profile - Update user profile (protected)

## Favorites

- GET /api/favorites - Get user's favorites (protected)
- POST /api/favorites - Add a country to favorites (protected)
- GET /api/favorites/:countryCode - Check if a country is favorited (protected)
- DELETE /api/favorites/:countryCode - Remove a country from favorites (protected)

# Challenges and Solutions

Challenge 1: Testing Components with External APIs
Problem: Testing components that use external APIs was difficult.
Solution: Used Jest to mock API calls and created wrapper components for context during tests.

Challenge 2: Authentication and Protected Routes
Problem: Securing routes and managing authentication was tricky.
Solution: Built an AuthContext with JWT tokens and local storage for authentication persistence.

Challenge 3: API Rate Limiting
Problem: The API sometimes limits requests, affecting the user experience.
Solution: Added error handling, loading states, and caching to reduce API calls.

Challenge 4: Jest Configuration with ES Modules
Problem: Setting up Jest to work with ES modules and modern React was challenging.
Solution: Configured Jest and Babel to support ES modules and React features.

# Deployment

Frontend Deployment (Netlify)
bash
https://eshmika-af.netlify.app/

Backend Deployment
