import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/')}
            className="cursor-pointer flex-1 flex items-center justify-start ml-3"
        >
            <img className="w-auto h-auto" src="/Logo.png" alt="Logo" />
        </div>
    );
}

export default Logo;
