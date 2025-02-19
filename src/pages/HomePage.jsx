import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/BlogCard'
import CategorySelect from '../components/CategorySelect'
import { AppContext } from '../context/ContextAPI'
import ContentLoadingPlaceholder from '../components/ContentLoadingPlaceholder'
import { getAllBlogs } from '../services/Blogs'



export default function HomePage() {

    // FUNCTIONS

    function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            setEndReached(true)
        } else {
            setEndReached(false);
        }
    };

    async function fetchBlogs() {
        if (AllBlogsFetched) {
            setLoading(false)
            return
        }
        setLoading(true)
        pageNumber.current++
        const response = await getAllBlogs(pageNumber.current, 12)
        if (response.status === 200) {
            setBlogsData(prevBlogs => { return [...prevBlogs, ...response.data.blogs] })
            setAllBlogsFetched(!response.data.hasMoreBlogs)
        } else {
            pageNumber.current -= 1
            setshowSnackbarAlert({
                show: true,
                msg: "Error! Something went wrong.",
                severity: 'error'
            })
        }
        setLoading(false)
    }

    function filterByCategory() {
        if (Category === "All") {
            setData(BlogsData)
            return
        }
        const filteredData = BlogsData.filter(item => item.category === Category)
        setData(filteredData)
    }

    // VARIABLES

    const { BlogsData, setBlogsData, pageNumber, setshowSnackbarAlert } = useContext(AppContext)
    const [Data, setData] = useState([])
    const [Loading, setLoading] = useState(true)
    const [EndReached, setEndReached] = useState(false)
    const [Category, setCategory] = useState('All')
    const [AllBlogsFetched, setAllBlogsFetched] = useState(false)
    const LoadingCards = [1, 2, 3, 4, 5, 6, 7, 8]


    // CODE

    useEffect(() => {
        if (BlogsData.length === 0) {
            fetchBlogs()
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        filterByCategory()
    }, [BlogsData, Category])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        if (EndReached === true && AllBlogsFetched === false) {
            console.log("End is reached")
            fetchBlogs()
        }
    }, [EndReached])


    // RETURN

    return (
        <div className='relative'>
            <Navbar />
            <section>
                <div className="container mx-auto lg:px-16 px-4">

                    <h1 className='mt-8 font-semibold text-4xl text-center'>Latest Blogs</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                        <div className="w-full">
                            <CategorySelect Category={Category} setCategory={setCategory} />
                        </div>
                    </div>


                    {
                        Data.length == 0 && Loading == false ?
                            <div className="w-full mt-8 font-semibold text-xl flex flex-col justify-center items-center">
                                <img src="./empty.png" alt="" />
                                <p>No Blogs Availabe Yet!</p>
                            </div>
                            :
                            null
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 mb-[150px]">
                        {
                            Data.map(blog => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))
                        }
                        {
                            Loading === true ?
                                LoadingCards.map(item => (
                                    <div key={item} className='border border-slate-400 bg-white shadow-lg w-full rounded-xl p-4'>
                                        <ContentLoadingPlaceholder lines={2} type={1} />
                                        <div className="mt-8"></div>
                                        <ContentLoadingPlaceholder lines={10} type={2} />
                                    </div>
                                ))
                                :
                                null
                        }

                    </div>

                </div>
            </section>
        </div>
    )
}
