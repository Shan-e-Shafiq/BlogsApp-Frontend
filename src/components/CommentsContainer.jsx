import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import ContentLoadingPlaceholder from '../components/ContentLoadingPlaceholder'
import { getBlogComments, postComment } from '../services/Blogs'
import { NumbersPrefix } from '../utils'
import { AppContext } from '../context/ContextAPI'



export default function CommentsContainer({ data, setdata, allCommentsFetched, screenSize, Loading }) {

    // FUNCTIONS

    const handleScroll = () => {
        if (waitForApiCall.current === true || allCommentsFetched.current === true) {
            return
        }
        // console.log('handle scroll')
        const { scrollTop, scrollHeight, clientHeight } = commentsContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            // console.log('End reached')
            waitForApiCall.current = true
            setEndReached(true);
        } else {
            setEndReached(false);
        }
    };


    function removeDuplicateComments(newlyFetchedComments) {
        if (newlyAddedComments.current.length != 0) {
            const noDuplicateComments = newlyFetchedComments.filter(newlyFetched => {
                let isNewlyAdded = false
                for (let i = 0; i < newlyAddedComments.current.length; i++) {
                    if (newlyFetched.name === newlyAddedComments.current[i].name && newlyFetched.comment === newlyAddedComments.current[i].comment) {
                        isNewlyAdded = true
                        break
                    }
                }
                if (isNewlyAdded === false) {
                    return newlyFetched
                }
            })

            return noDuplicateComments
        } else {
            // console.log('LENGTH IS ZERO')
            return newlyFetchedComments
        }

    }


    async function fetchMoreComments() {
        // console.log('I am calling api')
        pageNumber.current++
        const response = await getBlogComments(id, pageNumber.current)
        allCommentsFetched.current = !response.data.hasMoreComments
        if (response.status === 200) {
            const noDuplicateComments = removeDuplicateComments(response.data.commentsArray)
            setdata(prevState => {
                return {
                    ...prevState,
                    commentsArray: [
                        ...prevState.commentsArray, ...noDuplicateComments
                    ]
                }
            })
        } else {
            pageNumber.current -= 1
        }
        waitForApiCall.current = false
        setEndReached(false);
    }

    async function handlePostComment() {
        postBtnRef.current.disabled = true
        if (commentInput.current.value === '') {
            setpostCommentErr(true)
            return
        }
        const newComment = {
            name: User.userType === "User" ? `${User.firstName} ${User.lastName}` : User.name,
            comment: commentInput.current.value
        }
        const params = {
            comment: newComment,
            blogId: id,
            token: User.accessToken,
            User: User,
            setUser: setUser
        }
        const response = await postComment(params)
        if (response.status === 201) {
            // // console.log('newly added', newComment)
            newlyAddedComments.current.push(newComment)
            // // console.log("new Comments", newlyAddedComments.current)
            postBtnRef.current.disabled = false
            commentInput.current.value = ''
            setdata(prevState => {
                const newCommentsArray = prevState.commentsArray
                newCommentsArray.unshift(newComment)
                return {
                    ...prevState,
                    commentsLength: prevState.commentsLength + 1,
                    commentsArray: newCommentsArray
                }
            })
        } else {
            postBtnRef.current.disabled = false
        }
    }

    // VARIABLES

    let styles
    const { id } = useParams()
    const [endReached, setEndReached] = useState(false);
    const [postCommentErr, setpostCommentErr] = useState(false)
    const pageNumber = useRef(0)
    const waitForApiCall = useRef(false)
    const commentsContainerRef = useRef(null)
    const commentInput = useRef(null)
    const postBtnRef = useRef(null)
    const newlyAddedComments = useRef([])
    const { User, setUser } = useContext(AppContext)


    // CODE

    if (screenSize == "large") {
        styles = 'commentsContainer lg:w-[30%] w-[100%] h-[90vh] pb-[200px] z-40 overflow-y-scroll mt-0 pl-4 pr-2'
    } else {
        styles = 'block lg:hidden w-[100%] mt-4 lg:mt-0 lg:pl-4'
    }

    useEffect(() => {
        if (endReached === true && waitForApiCall.current === true) {
            fetchMoreComments()
        }
    }, [endReached])


    // RETURN

    return (
        <div ref={commentsContainerRef} onScroll={handleScroll} className={styles}>
            <div className='text-2xl font-medium text-center mb-4'>
                {
                    Loading ?
                        "Comments"
                        :
                        `Comments (${NumbersPrefix(data?.commentsLength)})`
                }
            </div>

            {
                Loading ?
                    null
                    :
                    <TextField
                        inputRef={commentInput}
                        fullWidth
                        id="outlined-basic"
                        label="Write a comment"
                        variant="outlined"
                        sx={{
                            display: location.pathname.includes('view-edit-blog') ? 'none' : 'block'
                        }}
                        multiline
                        error={postCommentErr}
                        helperText={postCommentErr ? `Can't post empty comment!` : null}
                        onChange={() => { setpostCommentErr(false) }}
                    />
            }

            <div className={`${Loading ? 'hidden' : 'flex'} w-full justify-end`}>
                <Button
                    ref={postBtnRef}
                    variant='contained'
                    sx={{
                        mt: 1,
                        mb: 2,
                        display: location.pathname.includes('view-edit-blog') ? 'none' : 'block'
                    }}
                    onClick={handlePostComment}
                >
                    Post
                </Button>
            </div>

            {
                Loading ? null :
                    data?.commentsLength == 0 ?
                        <div className='w-full font-medium text-lg mt-10 flex flex-col gap-2 justify-center items-center'>
                            <img src="../empty.png" alt="" />
                            No Comments Yet!
                        </div>
                        :
                        null
            }
            {
                Loading ?
                    null
                    :
                    data?.commentsArray.map((comment, idx) => (
                        <Comment key={idx} comment={comment} />
                    ))
            }
            {
                Loading || endReached ?
                    <div className="w-full flex flex-col gap-4">
                        <ContentLoadingPlaceholder lines={3} type={3} />
                        <ContentLoadingPlaceholder lines={3} type={3} />
                        <ContentLoadingPlaceholder lines={3} type={3} />
                        <ContentLoadingPlaceholder lines={3} type={3} />
                        <ContentLoadingPlaceholder lines={3} type={3} />
                    </div>
                    :
                    null
            }

        </div>
    )
}

function Comment({ comment }) {
    return (
        <div className="w-full bg-gray-100 border border-slate-300 rounded-lg mb-4 flex p-2">
            <div className="mr-2">
                <div className="w-12 h-12 rounded-full grid place-content-center text-2xl bg-blue-400 text-white">
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
            <div>
                <strong>{comment.name}</strong>
                <p>{comment.comment}</p>
            </div>
        </div>
    )
}