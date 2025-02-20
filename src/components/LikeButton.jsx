import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { likeBlog, unlikeBlog } from '../services/Blogs';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/ContextAPI';


export default function LikeButton({ setNumberOfLikes }) {

    // FUNCTIONS

    async function likeRequest(isLikedPreviously) {
        if (isTimerSet.current === true) {
            return
        }
        setDelayTimer(isLikedPreviously)
        const response = await likeBlog(params)
        if (response.status === 200) {
            console.log('liked')
        } else {
            isTimerSet.current = false
        }
    }

    async function unlikeRequest(isLikedPreviously) {
        if (isTimerSet.current === true) {
            return
        }
        setDelayTimer(isLikedPreviously)
        const response = await unlikeBlog(params)
        if (response.status === 200) {
            console.log('unliked')
        } else {
            isTimerSet.current = false
        }
    }

    function setDelayTimer(isLikedPreviously) {
        isTimerSet.current = true
        setTimeout(() => {
            isTimerSet.current = false
            if (isLikedPreviously != isLiked.current) {
                if (isLiked.current === true) {
                    likeRequest(isLiked.current)
                } else {
                    unlikeRequest(isLiked.current)
                }
            }
        }, 10000);

    }

    function handleLike() {

        // contains logic to handle and limit api calls due the excessive clicking on the like button by setting a delay timer

        isLiked.current = !isLiked.current
        if (isLiked.current === true) {
            setNumberOfLikes(prev => prev + 1)
            setUser(prev => {
                return {
                    ...prev,
                    likedBlogs: [...prev.likedBlogs, id]
                }
            })
            likeRequest(isLiked.current)
        } else {
            setNumberOfLikes(prev => prev - 1)
            setLikedBlogsData(prev => prev.filter(item => item._id !== id))
            setUser(prev => {
                return {
                    ...prev,
                    likedBlogs: prev.likedBlogs.filter(blog => blog !== id)
                }
            })
            unlikeRequest(isLiked.current)
        }
        setlike(prevState => !prevState)
    }

    // VARIABLES

    const [like, setlike] = useState(false)
    const isLiked = useRef(false)
    const isTimerSet = useRef(false)
    const { id } = useParams()
    const { User, setUser, setLikedBlogsData } = useContext(AppContext)
    const params = {
        blogId: id,
        token: User.accessToken,
        User: User,
        setUser: setUser
    }

    // CODE

    useLayoutEffect(() => {
        if (User.likedBlogs.includes(id)) {
            setlike(true)
            isLiked.current = true
        }
    }, [])

    // RETURN

    return (
        <button onClick={handleLike}>
            <i className={`${like || isLiked.current ? "fa-solid" : "fa-regular"} text-red-500 fa-heart text-4xl`}></i>
        </button>
    )
}