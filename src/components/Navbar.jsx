import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../context/ContextAPI'
import { Logout } from '../utils'


export default function Navbar() {

    function handleLogout() {
        Logout(User, setUser)

        setTimeout(() => {
            // may cause too many re-renders // need to fix this #TODO
            ResetStates()
        }, 1200);
    }

    const location = useLocation()
    const [openNavbar, setopenNavbar] = useState(false)
    const { User, setUser, ResetStates } = useContext(AppContext)


    return (
        <nav className='sticky top-0 left-0 right-0 py-2 lg:py-4 z-10'>

            {/* CONTAINER */}
            <div className="container mx-auto px-4 lg:px-16">
                {/* NAVBAR FOR LARGE SCREENS */}
                <div className="h-[60px] rounded-full shadow-lg border border-slate-400 bg-white hidden lg:flex justify-center items-center relative">

                    {/* HEADING */}
                    <Link to='/home' className="absolute left-6 cursor-pointer mb-[2px] flex items-center gap-1">
                        <img className='w-7' src="/vite.svg" alt="" />
                        <h1 className='text-2xl font-medium'>BlogsApp</h1>
                    </Link>


                    {/* NAVLINKS */}
                    <div className="flex text-lg font-semibold flex-row items-center lg:gap-10 xl:gap-14">
                        <Link className={`hover:underline ${location.pathname == "/home" ? "underline" : ""}`} to='/home'>Home</Link>
                        <Link className={`hover:underline ${location.pathname == "/post-blog" ? "underline" : ""}`} to='/post-blog'>Post Blogs</Link>
                        <Link className={`hover:underline ${location.pathname == "/your-blogs" ? "underline" : ""}`} to='/your-blogs'>Your Blogs</Link>
                        <Link className={`hover:underline ${location.pathname == "/liked-blogs" ? "underline" : ""}`} to='/liked-blogs'>Liked Blogs</Link>
                    </div>

                    {/* SIDE ITEMS */}
                    <div className="absolute right-2 flex justify-center items-center gap-2">
                        <span className='font-medium'>{
                            User.userType === "Users" ?
                                User.firstName + " " + User.lastName
                                :
                                User.name
                        }</span>
                        <button onClick={handleLogout} className='bg-blue-500 rounded-full h-12 w-12'>
                            <i className="fa-solid fa-right-from-bracket text-2xl text-white"></i>
                        </button>
                    </div>

                </div>

                {/* NAVBAR FOR SMALL SCREENS */}
                <div className={`py-2 rounded-xl shadow-lg border border-slate-400 bg-white flex lg:hidden items-center flex-col overflow-hidden transition-all ${openNavbar ? 'h-[214px]' : 'h-[50px]'}`}>

                    <div className="flex justify-between items-center w-full px-4">

                        {/* HEADING */}
                        <Link to='/home' className="cursor-pointer mb-[2px] flex items-center gap-1">
                            <img className='w-7' src="./vite.svg" alt="" />
                            <h1 className='text-2xl font-medium'>BlogsApp</h1>
                        </Link>

                        {/* HAMBURGER */}
                        <button onClick={() => { setopenNavbar(prevState => !prevState) }}>
                            <i className={`text-blue-500 text-2xl fa-solid ${openNavbar ? 'fa-xmark' : 'fa-bars'}`}></i>
                        </button>

                    </div>

                    {/* NAVLINKS */}
                    <div className={`flex text-md font-semibold flex-col gap-1 w-full px-4 mt-2 transition-all duration-500 ${openNavbar ? 'opacity-100' : 'opacity-0'}`}>
                        <Link className={`hover:underline ${location.pathname == "/home" ? "underline" : ""}`} to='/home'>Home</Link>
                        <Link className={`hover:underline ${location.pathname == "/post-blog" ? "underline" : ""}`} to='/post-blog'>Post Blogs</Link>
                        <Link className={`hover:underline ${location.pathname == "/your-blogs" ? "underline" : ""}`} to='/your-blogs'>Your Blogs</Link>
                        <Link className={`hover:underline ${location.pathname == "/liked-blogs" ? "underline" : ""}`} to='/liked-blogs'>Liked Blogs</Link>
                    </div>

                    {/* SIDE ITEMS */}
                    <div className={`w-full flex items-center justify-end px-4 mt-1 transition-all duration-500 ${openNavbar ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex justify-center items-center gap-2">
                            <span className='font-medium'>Abdullah</span>
                            <button onClick={handleLogout} className='bg-blue-500 rounded-full h-10 w-10'>
                                <i className="fa-solid fa-right-from-bracket text-xl text-white"></i>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </nav>
    )
}
