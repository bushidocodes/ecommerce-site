import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { receiveProducts } from '../reducers/products'
import Footer from './Footer'
import NavContainer from '../containers/NavContainer'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/api/products').then(res => dispatch(receiveProducts(res.data)))
  }, [])
  return (
    <div id="main" className="container-fluid">
      <NavContainer />
      <Outlet />
      <Footer />
    </div>
  )
}
