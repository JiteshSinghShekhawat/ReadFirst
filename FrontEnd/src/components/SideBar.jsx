import React from 'react';
import SideBarLower from './SideBarLower';
import SideBarUpper from './SideBarUpper';

function SideBar({ arrow, setArrow }) {
    return (
        <>
            <div className="px-3 py-2 h-1/4 min-h-[10rem]">
                <SideBarUpper arrow={arrow} setArrow={setArrow} />
            </div>
            <div className="h-3/4 p-3">
                <SideBarLower />
            </div>
        </>
    );
}

export default SideBar;
