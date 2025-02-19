import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { likeBlog, unlikeBlog } from '../services/Blogs';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/ContextAPI';


export default function LikeButton() {

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
            setUser(prev => {
                return {
                    ...prev,
                    likedBlogs: [...prev.likedBlogs, id]
                }
            })
            likeRequest(isLiked.current)
        } else {
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
    const { User, setUser } = useContext(AppContext)
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
        }
    }, [])

    // RETURN

    return (
        <button onClick={handleLike}>
            <i className={`${like || isLiked.current ? "fa-solid" : "fa-regular"} text-red-500 fa-heart text-4xl`}></i>
        </button>
    )
}














// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { likeBlog, unlikeBlog } from '../services/Blogs';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/ContextAPI';


// export default function LikeButton() {

//     async function likeRequest() {
//         const response = await likeBlog(params)
//         console.log(response)
//         if (response.status === 200) {
//             console.log('liked')
//             isTimerSet.current = false
//         } else {
//             // SOMETHING WENT WRONG
//             isTimerSet.current = false
//         }
//     }

//     async function unlikeRequest() {
//         const response = await unlikeBlog(params)
//         console.log(response)
//         if (response.status === 200) {
//             console.log('unliked')
//             isTimerSet.current = false
//         } else {
//             // SOMETHING WENT WRONG
//             isTimerSet.current = false
//         }
//     }

//     function setDelayTimer(isLikedPreviously) {
//         isTimerSet.current = true
//         setTimeout(() => {
//             if (isLikedPreviously === isLiked.current) {
//                 if (isLiked.current === true) {
//                     likeRequest()
//                 } else {
//                     unlikeRequest()
//                 }
//             } else {
//                 setDelayTimer(isLiked.current)
//             }
//         }, 10000);

//     }

//     function handleLike() {
//         isLiked.current = !isLiked.current
//         if (isTimerSet.current === false) {
//             setDelayTimer(isLiked.current)
//         }
//         setlike(prevState => !prevState)
//     }

//     const [like, setlike] = useState(false)
//     const isLiked = useRef(false)
//     const isTimerSet = useRef(false)
//     const { id } = useParams()
//     const { User, setUser } = useContext(AppContext)
//     const params = {
//         blogId: id,
//         token: User.accessToken,
//         User: User,
//         setUser: setUser
//     }


//     return (
//         <button onClick={handleLike}>
//             <i className={`${like || isLiked.current ? "fa-solid" : "fa-regular"} text-red-500 fa-heart text-4xl`}></i>
//         </button>
//     )
// }


