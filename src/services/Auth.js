export async function LoginWithEmailPassword(loginData) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
        credentials: 'include'
    })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function SignupWithEmailPassword(signupData) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData),
        credentials: 'include'
    })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function UserLogout() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/logout`, { credentials: 'include' })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function getUserData() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/auth/getData`, { credentials: 'include' })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function LoginWithGoogle() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/auth/google`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function GoogleLogout() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/auth/google/logout`, { credentials: 'include' })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function LoginWithFacebook() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/auth/facebook`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function FacebookLogout() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/auth/facebook/logout`, { credentials: 'include' })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function RefreshAccessToken() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/refresh`, { credentials: 'include' })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}