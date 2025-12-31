import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function AuthLayout() {
    return <>

        <Navbar />
        <div className='min-h-screen flex justify-center items-center bg-gray-200'>
            <Outlet />
        </div>
        <Footer/>

    </>

}
