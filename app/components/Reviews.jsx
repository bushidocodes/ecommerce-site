'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router'

export default () => (
  <div className="container">
    <div>
      <Link to="/products">
        <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
      </Link>
      <h1>Cookie Monsters</h1>
      <h3 className="subtitle">Home of the world's greatest cookies</h3>
    </div>

    <div id="reviews" className="row">
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="cookieContainer">
          <img
            className="cookieImage"
            src="/images/cookies/chocolate-chip.jpg"
          />
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-8">
        {/* REVIEW PRODUCT NAME */}
        <h3 id="reviewTitle">Chocolate Chip Cookie</h3>
        {/* Loop on this for product reviews */}
        {/* STARS - REVIEW TITLE: */}
        {/* Loop over stars to display by rating */}
        <h4>
          <i className="fa fa-star fa-lg reviewStar" aria-hidden="true"></i>{' '}
          Delicious
        </h4>
        {/* REVIEW BODY by REVIEW.USER */}
        <div className="review">
          <p className="reviewBody">
            I'm now fat and an addict. Thanks, Cookie Monsters. Nom nom nom.
          </p>
          <p className="reviewUser">submitted by Rachel</p>
        </div>
      </div>
    </div>
  </div>
)
