import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function withNavigate(Component) {
  return function WithNavigate(props) {
    const navigate = useNavigate()
    return <Component {...props} navigate={navigate} />
  }
}
