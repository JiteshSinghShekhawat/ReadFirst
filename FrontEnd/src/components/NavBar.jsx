import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import CornerProfile from './CornerProfile';
import Logo from './Logo';

function NavBar({ goToHome, logo, search }) {
    const token = localStorage.getItem('jwt');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URI}/profile`,
                    {   
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                setUser(data);
            } catch (e) {
                console.log(`Error while fetching profile ${e}`);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [token]);

    if (loading) {
        return <div>Loading... </div>;
    }

    return (
        <div className="w-full flex-none flex justify-center h-14">
            {logo && <Logo goToHome={goToHome} />}
            {search && user && user.valid != false && (
                <div className="ml-5 flex-1 flex items-center justify-start ">
                    <Search />
                </div>
            )}
            {(!user || user.valid == false) && (
                <div className="flex-1 w-full p-2 flex font-medium justify-end space-x-6">
                    <Link to="/signup">
                        <div className="cursor-pointer border-2 border-gray-100  px-7 py-2 rounded-3xl">
                            Sign in
                        </div>
                    </Link>
                    <Link to="/login">
                        <div className="cursor-pointer bg-black  text-white  px-7 py-2 rounded-3xl">
                            Log In
                        </div>
                    </Link>
                </div>
            )}
            {user && user.valid != false && (
                <div className="flex-1 flex w-full justify-end items-center">
                    <CornerProfile user={user} />
                </div>
            )}
        </div>
    );
}

export default NavBar;
