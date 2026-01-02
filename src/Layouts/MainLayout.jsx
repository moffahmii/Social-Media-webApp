import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-linear-to-b from-slate-50 via-blue-50/30 to-slate-100">
            <Navbar />
            <main className="grow pt-4 pb-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 blur-[100px] rounded-full -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 blur-[100px] rounded-full -z-10"></div>
                <div className="container mx-auto relative z-10">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}