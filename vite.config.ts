/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// Vite handles TS/JSX natively via esbuild — no Babel needed. The React client
// lives in app/ with index.html at the project root as the entry point. JSX uses
// the classic runtime (driven by tsconfig's "jsx": "react"); every JSX module
// imports React, so React is always in scope.
export default defineConfig({
  build: {
    // Express serves the built client from dist/ in production (see server/start.ts).
    outDir: 'dist',
  },
  server: {
    // `pnpm dev` runs the Vite dev server; the Express API runs separately via
    // `pnpm "start[dev]"`. Proxy API calls to it so relative /api requests work.
    proxy: {
      '/api': 'http://localhost:1337',
    },
  },
  test: {
    globals: true,
    // Default to node; the React component tests opt into jsdom via a
    // `// @vitest-environment jsdom` docblock. The server/db tests need a real
    // Node context (e.g. server/start.ts resolves dirs from a file:// URL).
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'app/**/*.test.tsx',
      'db/**/*.test.ts',
      'server/**/*.test.ts',
    ],
    // The db/server suites share one Postgres database and each runs
    // db.sync({ force: true }); run files serially (as mocha did) so concurrent
    // schema rebuilds don't race.
    fileParallelism: false,
  },
});
