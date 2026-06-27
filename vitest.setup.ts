// Register @testing-library/jest-dom's custom matchers (toBeInTheDocument,
// toHaveTextContent, etc.) on Vitest's `expect`, and their TypeScript types.
import '@testing-library/jest-dom/vitest';

// jsdom (used by the React component tests via a `// @vitest-environment jsdom`
// docblock) supplies window/document/localStorage automatically, so the only
// remaining global setup is the session secret the server modules require.
process.env.SESSION_SECRET ??= 'test-session-secret';
