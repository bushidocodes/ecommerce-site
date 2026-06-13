import React from 'react';
import chai, { expect } from 'chai';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { spy } from 'sinon';
chai.use(require('sinon-chai'));

import { WhoAmI } from './WhoAmI';

afterEach(cleanup);

describe('<WhoAmI/>', () => {
  const user = {
    name: 'Dr. Bones',
  };
  const logout = spy();
  let container: HTMLElement;
  beforeEach(() => {
    logout.resetHistory();
    ({ container } = render(<WhoAmI user={user} logout={logout} />));
  });

  it('greets the user', () => {
    expect(container.textContent).to.contain(user.name);
  });

  it('has a logout button', () => {
    expect(container.querySelectorAll('button.logout').length).to.equal(1);
  });

  it('calls props.logout when logout is tapped', () => {
    fireEvent.click(container.querySelector('button.logout')!);
    expect(logout).to.have.been.called;
  });
});
