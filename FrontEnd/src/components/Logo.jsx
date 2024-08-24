import React from 'react';

function Logo({ goToHome }) {
    return (
        <div
            onClick={() => goToHome()}
            className="cursor-pointer flex-1 flex items-center justify-start ml-3"
        >
            <img className="w-auto h-auto" src="/Logo.png" alt="Logo" />
        </div>
    );
}

export default Logo;
