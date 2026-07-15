// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { User } from '../types';
import { WhoAmI } from './WhoAmI';

afterEach(cleanup);

describe('<WhoAmI/>', () => {
  const user: User = {
    id: 1,
    name: 'Dr. Bones',
    email: 'bones@example.com',
    isAdmin: false,
  };
  const logout = vi.fn();
  beforeEach(() => {
    logout.mockClear();
    render(<WhoAmI user={user} logout={logout} />);
  });

  it('greets the user', () => {
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('has a logout button', () => {
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('calls props.logout when logout is tapped', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));
    expect(logout).toHaveBeenCalled();
  });
});
