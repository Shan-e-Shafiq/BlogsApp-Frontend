import React from 'react'
import ContentLoadingPlaceholder from '../components/ContentLoadingPlaceholder'

export default function Testing() {
    return (
        <>
            {/* <div className="">
                <div className="animate-fade w-full bg-gray-300 h-5 mb-2 rounded-full"></div>
                <div className="animate-fade w-full bg-gray-300 h-5 mb-2 rounded-full"></div>
                <div className="animate-fade w-full bg-gray-300 h-5 mb-2 rounded-full"></div>
                <div className="animate-fade w-[65%] bg-gray-300 h-5 mb-2 rounded-full"></div>
            </div> */}


            <div className="w-[500px] ml-20 mt-20">
                <ContentLoadingPlaceholder lines={3} type={2} />
            </div>
        </>
    )
}
