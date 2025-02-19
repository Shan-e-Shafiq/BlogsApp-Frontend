import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { TextField, Box, Button, FormHelperText } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/ContextAPI'
import FullScreenLoader from '../components/FullScreenLoader'
import { addNewBlog, editBlog, getBlogById } from '../services/Blogs'
import { useForm, Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SnackbarAlert from '../components/SnackbarAlert'



export default function PostBlogPage() {

    // FUNCTIONS

    async function handlePublish(data) {
        const params = {
            newBlog: data,
            token: User.accessToken,
            publisher: {
                id: User._id,
                name: User.userType === "Users" ? User.firstName + " " + User.lastName : User.name,
                userType: User.userType,
            },
            User: User,
            setUser: setUser
        }
        const response = await addNewBlog(params)
        if (response.status === 201) {
            setBlogsData(prevState => { return [{ ...response.data.blog }, ...prevState] })
            setUserBlogsData(prevState => { return [{ ...response.data.blog }, ...prevState] })
            navigate('/your-blogs')
            setTimeout(() => {
                setshowSnackbarAlert({
                    show: true,
                    msg: "Success! Blog published successfully.",
                    severity: 'success'
                })
            }, 500);
        } else {
            alert('Something went Wrong! Please Try Again.')
        }
        console.log("publish", data)
        setLoading(false)
    }

    async function handleUpdate(data) {
        const params = {
            editedData: data,
            blogId: id,
            token: User.accessToken,
            User: User,
            setUser: setUser
        }
        const response = await editBlog(params)
        if (response.status === 201) {
            const updatedBlog = response.data.blog
            console.log('updatedBlog', updatedBlog)
            setBlogsData(prevState => prevState.map(blog =>
                blog._id === updatedBlog._id ? updatedBlog : blog
            ));
            setUserBlogsData(prevState => prevState.map(blog =>
                blog._id === updatedBlog._id ? updatedBlog : blog
            ))
            navigate(`/view-edit-blog/${updatedBlog._id}`)
            setTimeout(() => {
                setshowSnackbarAlert({
                    show: true,
                    msg: "Success! Blog updated successfully.",
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
        setLoading(false)
    }

    function onSubmit(data) {
        setLoading(true)
        if (location.pathname.includes('edit-blog')) {
            handleUpdate(data)
        } else {
            handlePublish(data)
        }
    }

    async function fetchBlog() {
        const response = await getBlogById(id)
        if (response.status === 200) {
            return response.data.blog
        }
        return {}
    }

    async function findBlogData() {
        setLoading(true)
        let foundBlog = BlogsData.find(blog => blog._id === id)
        if (foundBlog === undefined) {
            foundBlog = await fetchBlog()
        }
        reset({
            category: foundBlog.category,
            title: foundBlog.title,
            content: foundBlog.content
        })
        setLoading(false)
    }

    // VARIABLES

    const location = useLocation()
    const { id } = useParams()
    const [Loading, setLoading] = useState(false)
    const { User, setUser, BlogsData, setBlogsData, setUserBlogsData, setshowSnackbarAlert } = useContext(AppContext)
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // CODE

    useEffect(() => {
        if (location.pathname.includes('edit-blog')) {
            findBlogData()
        } else {
            reset({
                category: "",
                title: "",
                content: ""
            })
        }
    }, [location])


    // RENDER

    return (
        <div className='relative'>
            <Navbar />
            <section className='mb-[150px]'>
                {/* <SnackbarAlert /> */}
                <FullScreenLoader Loading={Loading} transparent={true} />
                <div className="container mx-auto lg:px-16 px-4">

                    <h1 className='mt-8 font-semibold text-4xl text-center'>
                        {
                            location.pathname.includes('edit-blog') ?
                                `Edit Your Blog` :
                                `Post Your Blog`
                        }
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-[100%] lg:w-[70%] mx-auto mt-6">

                            {/* CATEGORY */}
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={''}
                                rules={{ required: "Please select a category" }}
                                render={({ field }) => (
                                    <FormControl fullWidth variant="outlined" error={!!errors.category}>
                                        <InputLabel>Category</InputLabel>
                                        <Select {...field} label="Category">
                                            <MenuItem value={"General"}>General</MenuItem>
                                            <MenuItem value={"News"}>News</MenuItem>
                                            <MenuItem value={"Sports"}>Sports</MenuItem>
                                            <MenuItem value={"Technology"}>Technology</MenuItem>
                                            <MenuItem value={"Economy"}>Economy</MenuItem>
                                            <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
                                        </Select>
                                        {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                                    </FormControl>
                                )}
                            />

                            {/* BLOG TITLE */}
                            <Controller
                                name="title"
                                control={control}
                                defaultValue={''}
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        sx={{ mt: 3 }}
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label="Blog Title"
                                        variant="outlined"
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                )}
                            />

                            {/* BLOG CONTENT */}
                            <Controller
                                name="content"
                                control={control}
                                defaultValue={''}
                                rules={{
                                    required: "Content is required",
                                    minLength: { value: 260, message: "Content is too short for this blog. Please write more!" }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        sx={{ mt: 3 }}
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label="Blog Content"
                                        variant="outlined"
                                        multiline
                                        rows={20}
                                        error={!!errors.content}
                                        helperText={errors.content?.message}
                                    />
                                )}
                            />

                            {/* PUBLISH & UPDATE BUTTON */}
                            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} mt={3}>
                                {
                                    location.pathname.includes('edit-blog') ?
                                        <button type='submit' className='p-2 text-white font-semibold bg-green-600 rounded-lg flex justify-center items-center gap-2 '>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            Update
                                        </button>
                                        :
                                        <button type='submit' className='p-2 text-white font-semibold bg-blue-500 rounded-lg flex justify-center items-center gap-2 '>
                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                            Publish
                                        </button>
                                }
                            </Box>


                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
