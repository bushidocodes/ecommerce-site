// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

afterEach(cleanup);

function renderNav(props: React.ComponentProps<typeof Nav>) {
  return render(
    <MemoryRouter>
      <Nav {...props} />
    </MemoryRouter>
  );
}

describe('<Nav/>', () => {
  const noop = () => {};

  describe('when logged out', () => {
    beforeEach(() => {
      renderNav({ auth: null, logout: noop, selectUser: noop });
    });

    it('shows Sign Up link', () => {
      expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('shows Login link', () => {
      expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    });

    it('does not show Logout', () => {
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('when logged in as a regular user', () => {
    const user = {
      id: 1,
      name: 'Rachel',
      email: 'rachel@example.com',
      isAdmin: false,
    };
    beforeEach(() => {
      renderNav({ auth: user, logout: noop, selectUser: noop });
    });

    it('greets the user by name', () => {
      expect(screen.getByText('Rachel')).toBeInTheDocument();
    });

    it('shows Logout', () => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('does not show Users link (not admin)', () => {
      expect(
        screen.queryByRole('link', { name: 'Users' })
      ).not.toBeInTheDocument();
    });
  });

  describe('when logged in as admin', () => {
    const admin = {
      id: 2,
      name: 'Evan',
      email: 'evan@example.com',
      isAdmin: true,
    };
    beforeEach(() => {
      renderNav({ auth: admin, logout: noop, selectUser: noop });
    });

    it('shows Users link for admin', () => {
      expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
    });
  });
});
