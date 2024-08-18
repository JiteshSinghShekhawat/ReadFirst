import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function Auth() {
    const [flag, setFlag] = useState(true);
    return (
        <div className="flex min-h-screen min-w-72">
            <div className="first flex-auto w-2/3"></div>
            <div className="flex-none flex justify-center items-center w-full lg:w-1/3 md:w-1/2 sm:w-3/4">
                {flag ? (
                    <LoginForm setFlag={setFlag} />
                ) : (
                    <SignupForm setFlag={setFlag} />
                )}
            </div>
        </div>
    );
}

export default Auth;
