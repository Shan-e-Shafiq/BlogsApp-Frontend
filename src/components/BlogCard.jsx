import { Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { categoryColorMap, NumbersPrefix } from '../utils'


export default function BlogCard(props) {

    const { _id, title, category, content, likes, publisher, createdAt } = props.blog

    function handleClick() {
        if (location.pathname.includes('your-blogs')) {
            navigate(`/view-edit-blog/${_id}`)
        } else {
            navigate(`/view-blog/${_id}`)
        }
    }
    function handlePublisherClick(e) {
        e.stopPropagation()
        navigate(`/publisher-blogs/${publisher.name}/${publisher.id}`)
    }
    function handleEdit(e) {
        e.stopPropagation()
        navigate(`/edit-blog/${_id}`)
        console.log('edit blog')
    }
    // function handleDelete(e) {
    //     e.stopPropagation()
    //     console.log('delete blog')
    // }

    const navigate = useNavigate()
    const location = useLocation()


    return (
        <div onClick={handleClick} className='relative border cursor-pointer hover:scale-105 transition-all duration-300 border-slate-400 bg-white shadow-lg w-full rounded-xl p-4'>

            <div className="flex justify-between items-center">
                <div className={`px-2 py-1 rounded-full w-fit text-white text-sm font-semibold ${categoryColorMap[category]}`}>
                    {category}
                </div>
                <div className="flex justify-center items-center font-semibold text-lg text-gray-600">
                    <i className="fa-solid fa-heart mr-[4px]"></i>
                    <span>{NumbersPrefix(likes)}</span>
                </div>
            </div>

            <h1 className='font-semibold text-2xl mt-1'>{
                title.length > 38 ? `${title.slice(0, 40)} ......` : title
            }</h1>

            <div className={`${location.pathname.includes('/your-blogs') || location.pathname.includes('/publisher-blogs') ? "hidden" : 'block'} mt-2`}>
                Published by&nbsp;
                <span onClick={handlePublisherClick} className='font-semibold hover:underline text-[16px]'>{
                    publisher.name
                }</span>
            </div>

            <p className='mt-2 text-justify font-medium'>
                {content.length > 252 ? `${content.slice(0, 252)} ......` : content}
            </p>

            <div className="flex sm:items-center flex-col sm:flex-row justify-between mt-4">

                <div className="flex flex-col">
                    <span className='text-sm'>Posted on</span>
                    <span className='text-md font-semibold'>{dayjs(createdAt).format('MMM D, YYYY')}</span>
                </div>

                {
                    location.pathname.includes('/your-blogs') ?
                        // <div className="flex flex-row gap-2 mt-2 sm:mt-0 ml-auto sm:ml-0">
                        //     <button
                        //         onClick={handleEdit}
                        //         className='px-2 py-2 rounded-lg bg-black text-white font-semibold flex items-center justify-center gap-2'>
                        //         <i className="fa-solid fa-pen-to-square"></i>
                        //         Edit
                        //     </button>

                        //     <button onClick={handleDelete} className='px-2 py-2 rounded-lg bg-red-500 text-white font-semibold flex items-center justify-center gap-2'>
                        //         <i className="fa-solid fa-trash"></i>
                        //         Delete
                        //     </button>
                        // </div>
                        <button onClick={handleEdit} className='py-2 px-4 text-white font-semibold bg-green-600 rounded-lg flex justify-center items-center gap-2 mt-2 sm:mt-0 ml-auto sm:ml-0'>
                            <i className="fa-solid fa-pen-to-square"></i>
                            Edit
                        </button>
                        :
                        <button onClick={handleClick} className='p-2 text-white font-semibold bg-blue-500 rounded-lg flex justify-center items-center gap-2 mt-2 sm:mt-0 ml-auto sm:ml-0'>
                            <i className="fa-solid fa-eye"></i>
                            Read More
                        </button>
                }

            </div>

        </div>
    )
}
