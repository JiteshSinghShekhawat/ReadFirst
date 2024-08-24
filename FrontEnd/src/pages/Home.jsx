import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

const Home = () => {
    const [home, setHome] = useState(true);
    const [logo, setLogo] = useState(false);
    const [search, setSearch] = useState(false);
    const [arrow, setArrow] = useState(1);

    const goToHome = () => {
        setHome(true);
        setLogo(false);
        setSearch(false);
    };

    useEffect(() => {
        if (arrow == 1) {
            setHome(true);
            setLogo(false);
            setSearch(false);
        } else {
            setLogo(false);
            setSearch(true);
        }
    }, [arrow]);

    return (
        <div className="flex h-screen min-w-[50rem] min-h-[30rem]">
            <div className="flex-none basis-1/5 min-w-[15rem] flex flex-col">
                <SideBar
                    goToHome={goToHome}
                    arrow={arrow}
                    setArrow={setArrow}
                />
            </div>
            <div className="flex-1">
                <NavBar goToHome={goToHome} logo={logo} search={search} />
            </div>
        </div>
    );
};

export default Home;
