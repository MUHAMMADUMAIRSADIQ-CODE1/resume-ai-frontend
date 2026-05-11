import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { context } from '../store/context'

const ProtectedRoute = ({ user, children }) => {
  let { loader } = useContext(context)
  const navigate = useNavigate()
 
  if (loader) return null

  if (!user) {
    return <Navigate to="/" replace />
  }
  return children

}

export default ProtectedRoute