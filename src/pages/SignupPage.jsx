import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { SignupWithEmailPassword } from '../services/Auth';
import { AppContext } from '../context/ContextAPI';
import FullScreenLoader from '../components/FullScreenLoader';


export default function SignupPage() {

    // FUNCTIONS

    function handleShowPassword(e) {
        setShowPassword(e.target.checked)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const dataObject = Object.fromEntries(data.entries())
        if (dataObject.password !== dataObject.confirmPassword) {
            alert("Both passwords should be same")
            setLoading(false)
            return
        }
        formData.current = dataObject
        const response = await SignupWithEmailPassword(formData.current)
        if (response.status == 201) {
            setUser({ ...response.data.user, isAuthenticated: true })
            navigate('/home', { replace: true })
            setLoading(false)
            setTimeout(() => {
                setshowSnackbarAlert({
                    show: true,
                    msg: "Welcome to BlogsApp",
                    severity: 'info'
                })
            }, 500);
            return
        }
        setshowSnackbarAlert({
            show: true,
            msg: response.data.msg,
            severity: 'error'
        })
        setLoading(false)
    }

    function handleFacebookAuth() {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/user/auth/facebook`
    }

    function handleGoogleAuth() {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/user/auth/google`
    }

    // VARIABLES

    const [ShowPassword, setShowPassword] = useState(false)
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const SignupForm = useRef(null)
    const formData = useRef({})
    const { setUser, setshowSnackbarAlert } = useContext(AppContext)

    // CODE

    useEffect(() => {
        SignupForm.current.addEventListener('submit', handleSubmit)
    }, [])

    // RETURN

    return (
        <section className='relative min-h-screen flex justify-center items-center py-20'>
            <FullScreenLoader Loading={Loading} transparent={true} />
            <div
                className='max-w-[400px] bg-white px-4 py-8 sm:px-8 border border-slate-300 rounded-2xl shadow-lg'
            >
                <form ref={SignupForm}>
                    <Typography variant="h4">
                        Create Account
                    </Typography>

                    <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={2} justifyContent={'space-between'} alignItems={'center'} mt={3}>
                        <Box width={{
                            xs: '100%',
                            sm: '48%'
                        }}>
                            <TextField
                                fullWidth
                                label="First name"
                                variant="outlined"
                                name='firstName'
                                required={true}
                            />
                        </Box>
                        <Box width={{
                            xs: '100%',
                            sm: '48%'
                        }}>
                            <TextField
                                fullWidth
                                label="Last name"
                                variant="outlined"
                                name='lastName'
                                required={true}
                            />
                        </Box>
                    </Box>

                    <TextField
                        sx={{
                            mt: 2,
                        }}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name='email'
                        type='email'
                        required={true}
                    />
                    <TextField
                        sx={{
                            mt: 2
                        }}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={ShowPassword ? "text" : "password"}
                        name='password'
                        required={true}
                    />
                    <TextField
                        sx={{
                            mt: 2
                        }}
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        type={ShowPassword ? "text" : "password"}
                        name='confirmPassword'
                        required={true}
                    />

                    <FormGroup sx={{ mt: 1, userSelect: 'none' }}>
                        <FormControlLabel control={<Checkbox onChange={handleShowPassword} />} label="Show password" />
                    </FormGroup>

                    <button type='submit' className='w-full h-[50px] bg-blue-500 text-white font-semibold rounded-md mt-4'>
                        Sign Up
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

                <p className='mt-4 text-center'>Already have an account? <strong onClick={() => { navigate('/login') }} className='text-blue-500 hover:underline cursor-pointer'>Login</strong></p>
            </div>
        </section>
    )
}
