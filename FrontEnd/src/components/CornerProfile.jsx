import React from 'react';
import { useNavigate } from 'react-router-dom';

function CornerProfile({ user, write }) {
    const navigate = useNavigate(); 
    const logOut = () => {
        localStorage.removeItem('jwt');
        window.location.reload();
    };
    const writePost = () =>{
        navigate('/post'); 
    }
    return (
        <>
            {write && (
                <div
                    onClick={writePost}
                    className="mr-5 flex items-center justify-center cursor-pointer"
                >
                    <div className="flex-1">
                        <img className="w-5" src="/write.png" alt="" />
                    </div>
                    <div className="flex-1 pl-2 text-md font-medium">Write</div>
                </div>
            )}

            <div onClick={logOut} className="mr-10 rounded-full w-7 h-7 bg-gray-200 cursor-pointer"></div>
        </>
    );
}

export default CornerProfile;
