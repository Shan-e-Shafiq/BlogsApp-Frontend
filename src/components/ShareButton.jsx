import React, { useState } from 'react'
import Modal from '@mui/material/Modal';


export default function ShareButton({ title }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [copy, setcopy] = useState("Copy")


    return (
        <>
            <button onClick={handleOpen} className='border-[3px] border-black rounded-full flex py-1 px-4 gap-2 items-center text-lg'>
                <i className="fa-solid fa-share-nodes"></i>
                <p className='font-semibold'>Share</p>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] sm:w-[400px] p-4 bg-white shadow-xl rounded-xl'>
                    <h1 className='text-lg sm:text-2xl font-semibold text-center'>Want to Share it?</h1>
                    <p className='mt-4 text-sm sm:text-[16px]'>Share this blog via social media</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-0 sm:justify-between items-center mt-3">
                        <button
                            className="w-[50px] h-[50px] overflow-hidden"
                            onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank") }}
                        >
                            <img className='object-contain' src="/icons/facebook.png" alt="" />
                        </button>
                        <button
                            className="w-[50px] h-[50px] overflow-hidden"
                            onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`, "_blank") }}
                        >
                            <img className='object-contain' src="/icons/twitter.png" alt="" />
                        </button>
                        <button
                            className="w-[55px] h-[55px] overflow-hidden"
                            onClick={() => { window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(window.location.href)}`, "_blank") }}
                        >
                            <img className='object-contain' src="/icons/whatsapp.png" alt="" />
                        </button>
                        <button
                            className="w-[55px] h-[55px] overflow-hidden"
                            onClick={() => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank") }}
                        >
                            <img className='object-contain' src="/icons/linkedin.png" alt="" />
                        </button>
                        <button
                            className="w-[50px] h-[50px] overflow-hidden"
                            onClick={() => { window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`, "_blank") }}
                        >
                            <img className='object-contain' src="/icons/telegram.png" alt="" />
                        </button>
                    </div>
                    <p className='mt-4 text-sm sm:text-[16px]'>Or copy this link</p>

                    <div className="relative border border-blue-500 rounded-lg w-full h-10 mt-3 flex items-center justify-between overflow-hidden">
                        <input type='text' value={window.location.href} disabled className="w-[75%] pl-2 h-full bg-transparent"></input>
                        <button
                            className='bg-blue-500 h-full w-[23%] text-white'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href)
                                setcopy('Copied')
                                setTimeout(() => {
                                    setcopy("Copy")
                                }, 2000);
                            }}
                        >
                            {copy}
                        </button>
                    </div>

                </div>
            </Modal>

        </>
    )
}