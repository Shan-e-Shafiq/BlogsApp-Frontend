import './App.css'
import { Typography } from '@mui/material'
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useContext } from 'react'
import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import PostBlogPage from './pages/PostBlogPage'
import YourBlogsPage from './pages/YourBlogsPage'
import ViewBlogPage from './pages/ViewBlogPage'
import { AppContext } from './context/ContextAPI'
import Testing from './pages/Testing'
import AuthPage from './pages/AuthPage'
import FullScreenLoader from './components/FullScreenLoader'
import LikedBlogs from './pages/LikedBlogs'
import SnackbarAlert from './components/SnackbarAlert'
import PublisherBlogsPage from './pages/PublisherBlogsPage'


const NotFound = () => {
    return (
        <section className='h-screen grid place-content-center'>
            <Typography variant="h4">
                {`404: Not found :(`}
            </Typography>
        </section>
    )
}

const AuthProtectedRoutes = ({ User }) => {
    if (User.isAuthenticated == true) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}


export default function App() {


    const { User, Loading } = useContext(AppContext)

    if (Loading) {
        return (
            <div>
                <FullScreenLoader Loading={true} transparent={false} />
            </div>
        )
    }

    return (
        <>

            <SnackbarAlert />

            <Routes>

                <Route path='/' element={<WelcomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/auth' element={<AuthPage />} />

                {/* AUTH PROTECTED ROUTES */}
                <Route element={<AuthProtectedRoutes User={User} />}>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/post-blog' element={<PostBlogPage />} />
                    <Route path='/your-blogs' element={<YourBlogsPage />} />
                    <Route path='/liked-blogs' element={<LikedBlogs />} />
                    <Route path='/view-blog/:id' element={<ViewBlogPage />} />
                    <Route path='/view-edit-blog/:id' element={<ViewBlogPage />} />
                    <Route path='/edit-blog/:id' element={<PostBlogPage />} />
                    <Route path='/publisher-blogs/:publisherName/:publisherID' element={<PublisherBlogsPage />} />
                </Route>

                <Route path='testing' element={<Testing />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </>
    )
}
