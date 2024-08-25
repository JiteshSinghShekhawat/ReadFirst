import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Post from './pages/Post';
import Auth from './pages/Auth';
import Notification from './components/Notification';
import Home from './pages/Home';

const App = () => {
    const [notification, setNotification] = useState('');
    const [flag, setFlag] = useState(true); // to know are you on login page or signup page
    const location = useLocation();

    useEffect(() => {
        // Set the flag based on the current route
        if (location.pathname === '/signup') {
            setFlag(false);
        } else if (location.pathname === '/login') {
            setFlag(true);
        }
    }, [location.pathname]);

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Auth
                            notification={notification}
                            setNotification={setNotification}
                            flag={flag}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Auth
                            notification={notification}
                            setNotification={setNotification}
                            flag={flag}
                        />
                    }
                />
                <Route path='/post/:id' element={ <Post />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
            </Routes>
            {notification && (
                <Notification
                    message={notification}
                    onClose={() => setNotification('')}
                />
            )}
        </>
    );
};

export default App;
