import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import PostList from '../components/PostList';
import NavBar from '../components/NavBar';

const Home = () => {
    const [logo, setLogo] = useState(false);
    const [search, setSearch] = useState(false);
    const [arrow, setArrow] = useState(1);

    useEffect(() => {
        if (arrow == 1) {
            setLogo(false);
            setSearch(false);
        } else {
            setLogo(false);
            setSearch(true);
        }
    }, [arrow]);

    return (
        <div className="flex h-screen max-w-screen min-w-[50rem] min-h-[30rem]">
            <div className="flex-none basis-1/5 min-w-[15rem] flex flex-col">
                <SideBar arrow={arrow} setArrow={setArrow} />
            </div>
            <div className="flex-1 flex flex-col">
                <NavBar logo={logo} search={search} />
                <div className="flex-1 overflow-y-scroll">
                    <PostList />
                </div>
            </div>
        </div>
    );
};

export default Home;
