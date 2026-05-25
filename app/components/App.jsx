import React, { Component } from 'react'
import Footer from './Footer'
import NavContainer from '../containers/NavContainer'

export default ({ children }) => (
  <div id="main" className="container-fluid">
    <NavContainer />
    {children}
    <Footer />
  </div>
)
