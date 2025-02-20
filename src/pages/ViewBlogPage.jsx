import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ContentLoadingPlaceholder from '../components/ContentLoadingPlaceholder'
import { deleteBlog, getBlogById } from '../services/Blogs'
import dayjs from 'dayjs'
import { categoryColorMap, NumbersPrefix } from '../utils'
import CommentsContainer from '../components/commentsContainer'
import ShareButton from '../components/ShareButton'
import LikeButton from '../components/LikeButton'
import AlertDialog from '../components/AlertDialog'
import { AppContext } from '../context/ContextAPI'
import FullScreenLoader from '../components/FullScreenLoader'



export default function ViewBlogPage() {


    // FUNCTIONS

    async function fetchBlog() {
        const response = await getBlogById(id)
        if (response.status === 200) {
            console.log(response.data.blog)
            allCommentsFetched.current = !response.data.blog.hasMoreComments
            setdata(response.data.blog)
        } else {
            alert('Something went wrong')
        }
        setLoading(false)
    }
    function handleEdit() {
        navigate(`/edit-blog/${id}`)
    }
    function handleDelete() {
        setOpenAlertDialog(true)
    }

    async function handleDeleteConfirmation() {
        setOpenAlertDialog(false)
        setbackdrop(true)
        const params = {
            blogId: id,
            token: User.accessToken,
            User: User, setUser: setUser
        }
        const response = await deleteBlog(params)
        if (response.status === 200) {
            setBlogsData(prev => prev.filter(blog => blog._id !== id))
            navigate('/your-blogs')
            setTimeout(() => {
                setshowSnackbarAlert({
                    show: true,
                    msg: "Success! Blog deleted successfully.",
                    severity: 'success'
                })
            }, 500);
        } else {
            setshowSnackbarAlert({
                show: true,
                msg: "Error! Something went wrong.",
                severity: 'error'
            })
        }
        setbackdrop(false)
    }

    function handlePublisherClick() {
        navigate(`/publisher-blogs/${data.publisher.name}/${data.publisher.id}`)
    }


    // VARIABLES

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const allCommentsFetched = useRef(false)
    const [openAlerDialog, setOpenAlertDialog] = useState(false);
    const [Loading, setLoading] = useState(true)
    const [backdrop, setbackdrop] = useState(false)
    const [data, setdata] = useState({})
    const [NumberOfLikes, setNumberOfLikes] = useState(0)
    const { User, setUser, setBlogsData, setshowSnackbarAlert } = useContext(AppContext)


    useEffect(() => {
        fetchBlog()
    }, [])

    useEffect(() => {
        if (Loading == false) {
            setNumberOfLikes(data.likes)
        }
    }, [Loading])



    return (
        <div className='relative'>
            <Navbar />
            <section className='mb-[150px]'>

                {/* <SnackbarAlert /> */}
                <FullScreenLoader Loading={backdrop} transparent={true} />
                <AlertDialog
                    open={openAlerDialog}
                    setOpen={setOpenAlertDialog}
                    msg={"Confirm Deletion"}
                    description={"Are you sure you want to delete this blog? This action is irreversible, and all associated data will be permanently lost."}
                    handleYES={handleDeleteConfirmation}
                />

                {/* FIXED SIDE COMMENTS CONTAINER FOR LARGE SCREENS */}
                <div className="hidden h-0 lg:block w-full fixed">
                    <div className="flex h-0 container mx-auto px-16">
                        <div className="w-[70%]"></div>
                        <CommentsContainer data={data} setdata={setdata} allCommentsFetched={allCommentsFetched} screenSize={"large"} Loading={Loading} />
                    </div>
                </div>

                {/* CONTAINER */}
                <div className="container mx-auto lg:px-16 px-4 flex lg:flex-row flex-col mt-8">

                    {/* CONTENT CONTAINER */}
                    <div className="lg:w-[70%] w-[100%]">

                        {
                            Loading ?
                                <ContentLoadingPlaceholder lines={4} type={1} />
                                :
                                <h1 className='text-4xl md:text-5xl'>{data.title}</h1>
                        }

                        {/* CONTENT DETAILS */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between mt-4">

                            {/* CATEGORY & LIKES */}
                            {
                                Loading ?
                                    null
                                    :
                                    <div className="flex items-center gap-4">
                                        <div className={`px-4 py-1 rounded-full w-fit text-white text-md font-semibold ${categoryColorMap[data.category]}`}>
                                            {data.category}
                                        </div>
                                        <div className='text-gray-600 text-lg font-semibold'><i className="fa-solid fa-heart"></i>
                                            {` ${NumbersPrefix(NumberOfLikes)} likes`}
                                        </div>
                                    </div>
                            }

                            {
                                Loading ?
                                    null
                                    :
                                    location.pathname.includes('view-edit-blog')
                                        ?
                                        // EDIT & DELETE BUTTONS
                                        <div className={`${location.pathname.includes('view-edit-blog') ? 'flex' : 'hidden'} items-center justify-end gap-2 mt-2 sm:mt-0`}>

                                            <button
                                                onClick={handleEdit}
                                                className='px-2 py-2 rounded-lg bg-black text-white font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all'
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                Edit
                                            </button>

                                            <button
                                                onClick={handleDelete}
                                                className='px-2 py-2 rounded-lg bg-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all'
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                                Delete
                                            </button>

                                        </div>
                                        :

                                        // SHARE AND LIKE BUTTONS
                                        <div className="flex items-center gap-2 ml-auto sm:ml-0 mt-2 sm:mt-0">
                                            <LikeButton setNumberOfLikes={setNumberOfLikes} />
                                            <ShareButton title={data.title} />
                                        </div>
                            }

                        </div>

                        {/* PUBLISH DATES */}
                        <div className={`${Loading ? 'hidden' : 'block'} w-full mt-1 text-gray-600`}>
                            <p><span className='font-semibold text-black'>Published On</span>{` ${dayjs(data.createdAt).format('MMM D, YYYY')} by `}<span onClick={handlePublisherClick} className='font-semibold cursor-pointer hover:underline'>{data?.publisher?.name}</span></p>
                            <p><span className='font-semibold text-black'>Last Updated On </span>{dayjs(data.updatedAt).format('MMM D, YYYY')}</p>
                        </div>

                        {/* CONTENT BODY */}
                        {
                            Loading ?
                                <div className='mt-4'>
                                    <ContentLoadingPlaceholder lines={30} type={2} />
                                </div>
                                :
                                <p className='text-justify mt-4 text-lg'>{data.content}</p>
                        }

                    </div>

                    {/* EMPTY CONTAINER FOR LAYOUT CORRECTION */}
                    <div className="hidden lg:block w-[30%]"></div>

                    {/* COMMENTS CONTAINER FOR SMALL SCREENS */}
                    <CommentsContainer data={data} setdata={setdata} allCommentsFetched={allCommentsFetched} screenSize={"small"} Loading={Loading} />

                </div>
            </section>
        </div>
    )
}
