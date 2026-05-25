import React from 'react'
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
chai.use(require('sinon-chai'))

import { WhoAmI } from './WhoAmI'

describe('<WhoAmI/>', () => {
  const user = {
    name: 'Dr. Bones',
  }
  const logout = spy()
  let root
  beforeEach(
    'render the root',
    () => (root = shallow(<WhoAmI user={user} logout={logout} />))
  )

  it('greets the user', () => {
    expect(root.text()).to.contain(user.name)
  })

  it('has a logout button', () => {
    expect(root.find('button.logout').length).to.equal(1)
  })

  it('calls props.logout when logout is tapped', () => {
    root.find('button.logout').simulate('click')
    expect(logout).to.have.been.called
  })
})
