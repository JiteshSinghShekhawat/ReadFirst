import Logo from './Logo';
import React from 'react';

function SideBarUpper({ goToHome, arrow, setArrow }) {
    return (
        <div className="h-full border-2 border-gray-100 rounded-xl py-3 font-semibold">
            <Logo goToHome={goToHome} />
            <div className="flex mt-8 items-center gap-2">
                <div className="h-2">
                    {arrow == 1 && (
                        <img className="h-full" src="./arrow.png" alt="" />
                    )}
                    {arrow == 2 && (
                        <div className='w-2'></div>
                    )}
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setArrow(1);
                    }}
                >
                    Home
                </div>
            </div>
            <div className="flex mt-3 items-center gap-2">
                <div className="h-2">
                  {arrow == 1 && (
                        <div className='w-2'></div>
                    )}
                    {arrow == 2 && (
                        <img className="h-full" src="./arrow.png" alt="" />
                    )}
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setArrow(2);
                    }}
                >
                    Search
                </div>
            </div>
        </div>
    );
}

export default SideBarUpper;
