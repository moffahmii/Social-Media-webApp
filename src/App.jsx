import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './Pages/FeedPage'
import PostDetails from './Pages/PostDetails'
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import Regiester from './Pages/Regiester'
import ProtectedRoute from './Components/ProtectedRoute'
import AuthProtectedRoute from './Components/AuthProtectedRoute'

const routers = createBrowserRouter([
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
      { path: 'post-details/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
      { path: 'register', element: <AuthProtectedRoute><Regiester /></AuthProtectedRoute> },
    ]
  }
])
function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
