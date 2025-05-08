// src/setupTests.js

// Extend Jest with additional matchers from jest-dom
import "@testing-library/jest-dom";

// Polyfill TextEncoder/TextDecoder for Node
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

// Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
