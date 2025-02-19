import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {

    const navigate = useNavigate()


    return (
        <section className='h-screen flex flex-col justify-center items-center'>

            <h1 className='text-2xl sm:text-3xl mb-4 ml-3 text-center flex'>Welcome to</h1>
            <h1 className='text-5xl sm:text-6xl mb-14 text-center flex gap-1'>
                <img className='w-14' src="./vite.svg" alt="" />
                BlogsApp
            </h1>


            <button
                onClick={() => { navigate('/login') }}
                className='p-2 rounded-lg bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 z-20'>
                Get Started
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </section>
    )
}
