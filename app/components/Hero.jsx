import React from 'react'
import Cart from '../containers/CartContainer'

export default function (props) {
  return (
    <div id="headerRow" className="row">
      <div className="col-sm-6 col-xs-12">
        <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
        <h1>Cookie Monsters</h1>
        <h3 className="subtitle">Home of the world's greatest cookies</h3>
      </div>
      <div id="cartRow" className="col-sm-6 col-xs-12">
        <Cart />
      </div>
      <br />
    </div>
  )
}
