import React from 'react'

export default function ContentLoadingPlaceholder({ lines, type }) {

    let Number = []
    for (let i = 0; i < lines; i++) {
        Number.push(i)
    }

    if (type == 1) {
        return (
            <>
                {
                    Number.map(item => (
                        <div key={item} className="animate-fade w-full bg-gray-300 h-5 mb-2 rounded-full"></div>
                    ))
                }
                <div className="animate-fade w-[65%] bg-gray-300 h-5 mb-2 rounded-full"></div>
            </>
        )
    }
    if (type == 2) {
        return (
            <>
                {
                    Number.map(item => (
                        <div key={item} className="animate-fade w-full bg-gray-300 h-3 mb-2 rounded-full"></div>
                    ))
                }
                <div className="animate-fade w-[65%] bg-gray-300 h-3 mb-2 rounded-full"></div>
            </>
        )
    }
    if (type == 3) {
        return (
            <>
                <div className="w-full flex items-start justify-between">
                    <div className="animate-fade bg-gray-300 rounded-full w-12 h-12 mr-2"></div>
                    <div className="w-[90%]">
                        {
                            Number.map(item => (
                                <div key={item} className="animate-fade w-full bg-gray-300 h-3 mb-2 rounded-full"></div>
                            ))
                        }
                        <div className="animate-fade w-[65%] bg-gray-300 h-3 mb-2 rounded-full"></div>
                    </div>
                </div>
            </>
        )
    }

}
