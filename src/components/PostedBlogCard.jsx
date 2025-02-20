import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PostedBlogCard(props) {

    function handleClick() {
        navigate('/view-edit-blog/123')
        // console.log('click')
    }
    function handlePublisherClick() {
        alert('publisher')
    }
    function handleEdit(e) {
        e.stopPropagation()
        navigate('/edit-blog/123')
        // console.log('edit blog')
    }
    function handleDelete(e) {
        e.stopPropagation()
        // console.log('delete blog')
    }

    const categoryColorMap = {
        "General": "bg-black",
        "News": "bg-blue-500",
        "Sports": "bg-green-500",
        "Technology": "bg-orange-500",
        "Economy": "bg-red-500",
        "Blockchain": "bg-yellow-500",
    }
    const navigate = useNavigate()

    return (
        <div onClick={handleClick} className='border cursor-pointer hover:scale-105 transition-all duration-300 border-slate-400 bg-white shadow-lg w-full rounded-xl p-4'>

            <div className={`px-2 py-1 rounded-full w-fit text-white text-sm font-semibold ${categoryColorMap["General"]}`}>
                General
            </div>

            <h1 className='font-semibold text-2xl mt-1'>Lorem ipsum dolor sit, amet consectetur ......</h1>

            {/* <div className="mt-2 text-sm">
                Published by&nbsp;
                <span onClick={handlePublisherClick} className='font-semibold hover:underline text-[16px]'>John Doe</span>
            </div> */}

            <p className='mt-2 text-justify font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ex, eius porro id soluta accusamus facilis quos culpa quis ipsum rem beatae. Nulla est adipisci dignissimos molestiae laudantium praesentium laboriosam, eveniet eaque illo accusantium! ......</p>

            <div className="flex items-center justify-between mt-4">

                <div className="flex flex-col">
                    <span className='text-sm'>Posted on</span>
                    <span className='text-md font-semibold'>Dec 21, 2024</span>
                </div>

                <div className="flex flex-row gap-2">

                    <button
                        onClick={handleEdit}
                        className='px-2 py-2 rounded-lg bg-black text-white font-semibold flex items-center justify-center gap-2 z-20'>
                        <i className="fa-solid fa-pen-to-square"></i>
                        Edit
                    </button>

                    <button onClick={handleDelete} className='px-2 py-2 rounded-lg bg-red-500 text-white font-semibold flex items-center justify-center gap-2 z-20'>
                        <i className="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>

            </div>

        </div>
    )
}

