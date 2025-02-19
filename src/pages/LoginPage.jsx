import React, { useContext, useEffect, useRef, useState } from 'react'
import { Typography, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { LoginWithEmailPassword } from '../services/Auth';
import { AppContext } from '../context/ContextAPI';
import FullScreenLoader from '../components/FullScreenLoader';



export default function LoginPage() {

    // FUNCTIONS

    function handleShowPassword(e) {
        setShowPassword(e.target.checked)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        formData.current = Object.fromEntries(data.entries())
        const response = await LoginWithEmailPassword(formData.current)
        if (response.status == 200) {
            setUser({ ...response.data.user, isAuthenticated: true })
            navigate('/home', { replace: true })
            setLoading(false)
            setTimeout(() => {
                setshowSnackbarAlert({
                    show: true,
                    msg: "Welcome again to BlogsApp",
                    severity: 'info'
                })
            }, 500);
            return
        }
        setshowSnackbarAlert({
            show: true,
            msg: response.data.msg,
            severity: 'warning'
        })
        setLoading(false)
    }

    function handleFacebookAuth() {
        setLoading(true)
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/user/auth/facebook`
    }

    function handleGoogleAuth() {
        setLoading(true)
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/user/auth/google`
    }

    // VARIABLES

    const [ShowPassword, setShowPassword] = useState(false)
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const Loginform = useRef(null)
    const formData = useRef({})
    const { setUser, setshowSnackbarAlert } = useContext(AppContext)

    // CODE

    useEffect(() => {
        setLoading(false)
        Loginform.current.addEventListener('submit', handleSubmit)
    }, [])

    // RETURN

    return (
        <section className='relative min-h-screen flex justify-center items-center py-20'>
            <FullScreenLoader Loading={Loading} transparent={true} />
            <div
                className='max-w-[400px] bg-white px-4 py-8 sm:px-8 border border-slate-300 rounded-2xl shadow-lg'
            >

                <form ref={Loginform}>
                    <Typography variant="h4">
                        Login
                    </Typography>

                    <TextField
                        sx={{
                            mt: 3,
                        }}
                        fullWidth
                        name='email'
                        type='email'
                        label="Email"
                        variant="outlined"
                        required={true}
                    />
                    <TextField
                        sx={{
                            mt: 2
                        }}
                        fullWidth
                        name='password'
                        label="Password"
                        variant="outlined"
                        type={ShowPassword ? "text" : "password"}
                        required={true}
                    />
                    <FormGroup sx={{ mt: 1, userSelect: 'none' }}>
                        <FormControlLabel control={<Checkbox onChange={handleShowPassword} />} label="Show password" />
                    </FormGroup>

                    <button type='submit' className='w-full h-[50px] bg-blue-500 text-white font-semibold rounded-md mt-4'>
                        Login
                    </button>
                </form>

                <p className='text-center font-semibold mt-4'>Or</p>

                <button onClick={handleGoogleAuth} className='flex justify-center items-center gap-2 w-full h-[50px] bg-black text-white font-semibold rounded-md mt-4'>
                    <GoogleIcon fontSize='large' />
                    Continue with Google
                </button>
                <button onClick={handleFacebookAuth} className='flex justify-center items-center gap-2 w-full h-[50px] bg-blue-500 text-white font-semibold rounded-md mt-2'>
                    <FacebookIcon fontSize="large" />
                    Continue with Facebook
                </button>

                <p className='mt-4 text-center'>Don't have an account? <strong onClick={() => { navigate('/signup') }} className='text-blue-500 hover:underline cursor-pointer'>Create One</strong></p>
            </div>
        </section>
    )
}
