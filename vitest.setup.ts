// Vitest's jsdom environment supplies window/document/localStorage automatically,
// so the only global setup left is the session secret the server modules require.
process.env.SESSION_SECRET ??= 'test-session-secret';
