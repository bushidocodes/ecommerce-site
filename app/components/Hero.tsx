import React from 'react';
import Cart from '../containers/CartContainer';

export default function Hero() {
  return (
    <div id="headerRow" className="row">
      <div className="col-sm-6 col-12">
        <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
        <h1>Cookie Monsters</h1>
        <h3 className="subtitle">Home of the world&apos;s greatest cookies</h3>
      </div>
      <div id="cartRow" className="col-sm-6 col-12">
        <Cart />
      </div>
      <br />
    </div>
  );
}
