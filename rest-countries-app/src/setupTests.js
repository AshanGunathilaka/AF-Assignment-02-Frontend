import "@testing-library/jest-dom"; // Allows using jest-dom matchers
import { TextEncoder, TextDecoder } from "util";
import fetchMock from "jest-fetch-mock"; // <-- Import fetch mock

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Enable fetch mocks globally
fetchMock.enableMocks(); // <-- Add this line
