import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav'

describe('<Nav/>', () => {
  const noop = () => {}

  describe('when logged out', () => {
    let root
    beforeEach(() => {
      root = shallow(
        <MemoryRouter>
          <Nav auth={null} logout={noop} selectUser={noop} />
        </MemoryRouter>
      )
    })

    it('shows Sign Up link', () => {
      expect(root.html()).to.contain('Sign Up')
    })

    it('shows Login link', () => {
      expect(root.html()).to.contain('Login')
    })

    it('does not show Logout', () => {
      expect(root.html()).to.not.contain('Logout')
    })
  })

  describe('when logged in as a regular user', () => {
    const user = { id: 1, name: 'Rachel', email: 'rachel@example.com', isAdmin: false }
    let root
    beforeEach(() => {
      root = shallow(
        <MemoryRouter>
          <Nav auth={user} logout={noop} selectUser={noop} />
        </MemoryRouter>
      )
    })

    it('greets the user by name', () => {
      expect(root.html()).to.contain('Rachel')
    })

    it('shows Logout', () => {
      expect(root.html()).to.contain('Logout')
    })

    it('does not show Users link (not admin)', () => {
      expect(root.html()).to.not.contain('>Users<')
    })
  })

  describe('when logged in as admin', () => {
    const admin = { id: 2, name: 'Evan', email: 'evan@example.com', isAdmin: true }
    let root
    beforeEach(() => {
      root = shallow(
        <MemoryRouter>
          <Nav auth={admin} logout={noop} selectUser={noop} />
        </MemoryRouter>
      )
    })

    it('shows Users link for admin', () => {
      expect(root.html()).to.contain('Users')
    })
  })
})
