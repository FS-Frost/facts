// jest-dom adds custom matchers for asserting on DOM nodes.
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";

// History, favorites, language and theme persist in localStorage; isolate tests.
afterEach(() => {
    localStorage.clear();
});
