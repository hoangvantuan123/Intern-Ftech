import React, { useState } from 'react';

function HeartButton() {
    const [isLiked, setIsLiked] = useState(false);

    const handleOnClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <button
            className="flex items-center space-x-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            onClick={handleOnClick}
        >
            {/* Icon heart */}
            <div className="relative w-5 h-5">
                <div className={`absolute inset-0 transition-all duration-300 ease-in-out bg-red-500 ${isLiked ? 'scale-100' : 'scale-0'} rounded-full heart-icon`}></div>
                <svg className={`absolute inset-0 heart-icon ${isLiked ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M13.826 2.113C11.478-.004 7.315-.004 4.966 2.113a6.9 6.9 0 0 0 0 9.774L9.155 18.82a1.375 1.375 0 0 0 2.02 0l4.189-4.933a6.895 6.895 0 0 0 0-9.774zm-1.264 8.712a1.374 1.374 0 0 0-1.983 0l-.053.062-.054-.062a3.151 3.151 0 0 1-4.42 0c-.61-.623-.945-1.45-.945-2.339 0-1.89 1.453-3.438 3.244-3.438 1.789 0 3.243 1.55 3.243 3.438 0 .888-.333 1.715-.944 2.339z" clip-rule="evenodd"></path>
                </svg>
            </div>
            {/* Text hiển thị trạng thái yêu thích và không yêu thích */}
            <span className={`text-sm font-medium leading-none ${isLiked ? 'hidden' : ''}`}>Yêu thích</span>
            <span className={`text-sm font-medium leading-none ${isLiked ? '' : 'hidden'}`}>Không yêu thích</span>
        </button>
    );
}

export default HeartButton;
