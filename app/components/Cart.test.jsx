import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Cart from './Cart'

describe('<Cart/>', () => {
  it('shows 0 items and $0.00 when cart is empty', () => {
    const root = shallow(
      <MemoryRouter>
        <Cart cart={[]} />
      </MemoryRouter>
    )
    expect(root.html()).to.contain('0')
    expect(root.html()).to.contain('$0.00')
  })

  it('shows correct item count and total for one item', () => {
    const cart = [
      {
        product: { id: 1, name: 'Chocolate Chip', price: 1.5, photo: '', description: '', categories: [] },
        quantity: 2,
      },
    ]
    const root = shallow(
      <MemoryRouter>
        <Cart cart={cart} />
      </MemoryRouter>
    )
    expect(root.html()).to.contain('2')
    expect(root.html()).to.contain('$3.00')
  })

  it('accumulates totals across multiple items', () => {
    const cart = [
      {
        product: { id: 1, name: 'Chocolate Chip', price: 1.5, photo: '', description: '', categories: [] },
        quantity: 2,
      },
      {
        product: { id: 2, name: 'Oatmeal Raisin', price: 2.0, photo: '', description: '', categories: [] },
        quantity: 1,
      },
    ]
    const root = shallow(
      <MemoryRouter>
        <Cart cart={cart} />
      </MemoryRouter>
    )
    // 2 + 1 = 3 items, 2*1.5 + 1*2.0 = $5.00
    expect(root.html()).to.contain('3')
    expect(root.html()).to.contain('$5.00')
  })
})
