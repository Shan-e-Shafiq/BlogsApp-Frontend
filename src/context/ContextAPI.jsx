import React, { createContext, useEffect, useRef, useState } from 'react'
import { getUserData, RefreshAccessToken } from '../services/Auth'


export const AppContext = createContext()


export default function ContextAPI({ children }) {

    // FUNCTIONS

    async function fetchUserData() {
        const response = await getUserData()
        if (response.status == 200) {
            setUser({ ...response.data, isAuthenticated: true })
        } else {
            setUser({ isAuthenticated: false })
        }
        setLoading(false)
    }
    async function getAccessToken(userData) {
        const response = await RefreshAccessToken()
        if (response.status === 200) {
            const newAccessToken = response.data.accessToken
            const newState = { ...userData, isAuthenticated: true, accessToken: newAccessToken }
            setUser(newState)
        } else {
            setUser({ isAuthenticated: false })
        }
        setLoading(false)
    }
    function handleUserAuthStatus() {
        const isAuthenticated = sessionStorage.getItem("isAuthenticated")
        const userData = JSON.parse(sessionStorage.getItem("userData"))
        if (isAuthenticated === "true" && userData !== null) {
            getAccessToken(userData)
        } else {
            fetchUserData()
        }
    }
    function ResetStates() {
        // reset all the context api state variables holding data upon logout 
        setBlogsData([])
        setUserBlogsData([])
        setLikedBlogsData([])
        setshowSnackbarAlert({
            show: false,
            msg: "Welcome to BlogsApp",
            severity: 'info'
        })
        pageNumber.current = -1
        userBlogsPageNumber.current = -1
        // likedBlogsPageNumber.current = -1
    }

    // VARIABLES

    const [User, setUser] = useState({
        isAuthenticated: false
    })
    const [BlogsData, setBlogsData] = useState([])
    const [UserBlogsData, setUserBlogsData] = useState([])
    const [LikedBlogsData, setLikedBlogsData] = useState([])
    const [showSnackbarAlert, setshowSnackbarAlert] = useState({
        show: false,
        msg: "Welcome to BlogsApp",
        severity: 'info'
    })
    const [Loading, setLoading] = useState(true)
    const pageNumber = useRef(-1)
    const userBlogsPageNumber = useRef(-1)
    // const likedBlogsPageNumber = useRef(-1)


    const contextObject = {
        User, setUser,
        BlogsData, setBlogsData,
        UserBlogsData, setUserBlogsData,
        showSnackbarAlert, setshowSnackbarAlert,
        LikedBlogsData, setLikedBlogsData,
        Loading, setLoading,
        pageNumber,
        userBlogsPageNumber,
        // likedBlogsPageNumber,
        ResetStates
    }

    // CODE

    useEffect(() => {
        handleUserAuthStatus()
    }, [])

    useEffect(() => {
        if (User.isAuthenticated === true) {
            setLoading(false)
            const userData = User
            // delete userData["accessToken"]  A WORST BUG
            sessionStorage.setItem("isAuthenticated", "true")
            sessionStorage.setItem("userData", JSON.stringify({ ...userData, accessToken: '' }))
        }
    }, [User])

    useEffect(() => {
        console.log("User", User)
    }, [User])


    // RETURN

    return (
        <AppContext.Provider value={contextObject}>
            {children}
        </AppContext.Provider>
    )
}
