import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export default function AuthProtectedRoute({ children }) {

    const { isLoggedIn, setisLoggedIn } = useContext(AuthContext)
    return !isLoggedIn ? children : <Navigate to={'/'} />
}