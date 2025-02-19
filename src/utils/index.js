import { FacebookLogout, GoogleLogout, RefreshAccessToken, UserLogout } from "../services/Auth"


export async function Logout(User, setUser) {
    let userType = User.userType
    switch (userType) {
        case "Users":
            await UserLogout()
            break
        case "GoogleUsers":
            await GoogleLogout()
            break
        case "FacebookUsers":
            await FacebookLogout()
            break
    }
    setUser({ isAuthenticated: false })
    sessionStorage.clear()
}

// REFRESHING THE EXPIRED ACCESS-TOKEN BASED ON REFRESH-TOKEN STORED AS HTTP-ONLY COOKIES & THEN CALLING BACK THE PREVIOUS API CALL FUNCTION
export async function getNewAccessToken(params, callback) {
    console.log('getNewAccessToken Called')
    const { User, setUser } = params
    const response = await RefreshAccessToken()
    if (response.status === 400 || response.status === 401 || response.status === 500) {
        alert("Un-authorized Access Denied")
        Logout(User, setUser)
    } else {
        console.log('new access token', response.data.accessToken)
        setUser(prevState => { return { ...prevState, accessToken: response.data.accessToken } })
        callback({ ...params, token: response.data.accessToken })
    }
}


export function NumbersPrefix(args) {
    let str = `${args}`
    if (str.length >= 4 && str.length <= 6) {
        return `${str.slice(0, (str.length - 3))}K+`
    }
    if (str.length >= 7 && str.length <= 9) {
        return `${str.slice(0, (str.length - 6))}M+`
    }
    if (str.length >= 10 && str.length <= 12) {
        return `${str.slice(0, (str.length - 6))}B+`
    }
    return args
}

export const categoryColorMap = {
    "General": "bg-black",
    "News": "bg-blue-500",
    "Sports": "bg-green-500",
    "Technology": "bg-orange-500",
    "Economy": "bg-red-500",
    "Blockchain": "bg-yellow-500",
}

// function LikesPrefix() {
//     let likesString = `${likes}`
//     if (likesString.length >= 4 && likesString.length <= 6) {
//         return `${likesString.slice(0, (likesString.length - 3))}K+`
//     }
//     if (likesString.length >= 7 && likesString.length <= 9) {
//         return `${likesString.slice(0, (likesString.length - 6))}M+`
//     }
//     if (likesString.length >= 10 && likesString.length <= 12) {
//         return `${likesString.slice(0, (likesString.length - 6))}B+`
//     }
//     if (likes == 0) {
//         return `${likesString} likes`
//     }
// }