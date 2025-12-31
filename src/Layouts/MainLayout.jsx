import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <div className='bg-gray-200 min-h-screen pt-4 container mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
