// @vitest-environment jsdom
import React from 'react';
import { expect } from 'chai';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

afterEach(cleanup);

describe('<Nav/>', () => {
  const noop = () => {};

  describe('when logged out', () => {
    let container: HTMLElement;
    beforeEach(() => {
      ({ container } = render(
        <MemoryRouter>
          <Nav auth={null} logout={noop} selectUser={noop} />
        </MemoryRouter>
      ));
    });

    it('shows Sign Up link', () => {
      expect(container.innerHTML).to.contain('Sign Up');
    });

    it('shows Login link', () => {
      expect(container.innerHTML).to.contain('Login');
    });

    it('does not show Logout', () => {
      expect(container.innerHTML).to.not.contain('Logout');
    });
  });

  describe('when logged in as a regular user', () => {
    const user = {
      id: 1,
      name: 'Rachel',
      email: 'rachel@example.com',
      isAdmin: false,
    };
    let container: HTMLElement;
    beforeEach(() => {
      ({ container } = render(
        <MemoryRouter>
          <Nav auth={user} logout={noop} selectUser={noop} />
        </MemoryRouter>
      ));
    });

    it('greets the user by name', () => {
      expect(container.innerHTML).to.contain('Rachel');
    });

    it('shows Logout', () => {
      expect(container.innerHTML).to.contain('Logout');
    });

    it('does not show Users link (not admin)', () => {
      expect(container.innerHTML).to.not.contain('>Users<');
    });
  });

  describe('when logged in as admin', () => {
    const admin = {
      id: 2,
      name: 'Evan',
      email: 'evan@example.com',
      isAdmin: true,
    };
    let container: HTMLElement;
    beforeEach(() => {
      ({ container } = render(
        <MemoryRouter>
          <Nav auth={admin} logout={noop} selectUser={noop} />
        </MemoryRouter>
      ));
    });

    it('shows Users link for admin', () => {
      expect(container.innerHTML).to.contain('Users');
    });
  });
});
