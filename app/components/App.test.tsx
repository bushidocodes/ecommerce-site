// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, vi } from 'vitest';
import rootReducer from '../reducers';
import App from './App';

vi.mock('../api', () => ({
  getJSON: () => Promise.resolve([]),
  postJSON: () => Promise.resolve({}),
}));

afterEach(cleanup);

function renderApp() {
  const store = configureStore({ reducer: rootReducer });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('<App/> landmark', () => {
  it('renders a single <main id="main"> landmark', () => {
    renderApp();
    const mains = document.querySelectorAll('#main');
    expect(mains).toHaveLength(1);
    expect(mains[0]?.tagName).toBe('MAIN');
  });
});

describe('document mount point', () => {
  it('uses #root in index.html so it does not collide with #main', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).toMatch(/id=["']root["']/);
    expect(html).not.toMatch(/id=["']main["']/);
  });
});
