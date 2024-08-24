import React from 'react';

function SideBarLower() {
    return (
        <div className="h-full border-2 border-gray-100 rounded-xl py-3  p-2">
            <div className="flex h-8 p-2 items-center">
                <div className="flex-1 basis-1/6">
                    <img className="h-4" src="./wifi.png" alt="" />
                </div>
                <div className="flex-1 basis-4/6 font-medium text-center">
                    Your Following
                </div>
                <div className="flex-1 basis-1/6">
                    <img className="ml-auto h-4" src="./add.png" alt="" />
                </div>
            </div>
            <div className="mt-4 rounded-lg bg-gray-300 w-full p-3">
                <div className="font-bold text-sm">
                    Let's Find some author to follow
                </div>
                <div className="mt-1 mb-5 font-medium text-sm">
                    we'll keep you updated on new posts
                </div>
                <div className="cursor-pointer rounded-2xl bg-black w-2/3 text-white px-4 text-sm mt-3 py-2 text-center">
                    Browse Authors
                </div>
            </div>
        </div>
    );
}

export default SideBarLower;
