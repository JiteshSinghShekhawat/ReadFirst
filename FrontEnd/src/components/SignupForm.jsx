import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

function SignupForm({ notification, setNotification }) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setNotification('');
        if (!userName || !email || !fullName || !password || !cnfPassword) {
            setTimeout(() => {
                setNotification('Please fill in all fields.');
            }, 10);
            return;
        }
        if (password !== cnfPassword) {
            setTimeout(() => {
                setNotification(
                    "The passwords entered don't match. Please make sure both passwords are identical."
                );
            }, 10);
            return;
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URI}/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName,
                        email,
                        fullName,
                        password,
                    }),
                }
            );

            const data = await response.json();
            setTimeout(() => {
                setNotification(data.message);
            }, 10);

            if (data.valid) {
                const token = data.token;
                localStorage.setItem('jwt', token);
                navigate('/home');
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="w-full text-center">
            <img className="mx-auto" src="/Logo.png" alt="Logo" />
            <form onSubmit={onSubmit} className="w-2/3 mx-auto my-2 text-left">
                <h2 className="text-lg font-medium pl-1">Email</h2>
                <input
                    placeholder="Enter email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    className="bg-gray-200 w-full rounded-lg p-2 my-1"
                    name=""
                    id=""
                />
                <h2 className="text-lg font-medium pl-1 pt-1">User Name</h2>
                <input
                    placeholder="Enter User Name"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                    className="bg-gray-200 w-full rounded-lg p-2 my-1"
                    type="text"
                    name=""
                    id=""
                />
                <h2 className="text-lg font-medium pl-1 pt-1">Full Name</h2>
                <input
                    placeholder="Enter Full Name"
                    onChange={(e) => {
                        setFullName(e.target.value);
                    }}
                    className="bg-gray-200 w-full rounded-lg p-2 my-1"
                    type="text"
                    name=""
                    id=""
                />
                <h2 className="text-lg font-medium pl-1 pt-1">Password</h2>
                <input
                    placeholder="Enter Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="bg-gray-200 w-full rounded-lg p-2 my-1"
                    type="password"
                    name=""
                    id=""
                />
                <h2 className="text-lg font-medium pl-1 pt-1">
                    Confirm Password
                </h2>
                <input
                    placeholder="Enter Password Again "
                    onChange={(e) => {
                        setCnfPassword(e.target.value);
                    }}
                    className="bg-gray-200 w-full rounded-lg p-2 my-1"
                    type="password"
                    name=""
                    id=""
                />
                <input
                    className="cursor-pointer w-full font-medium my-6 rounded-lg p-2 bg-black text-white"
                    type="submit"
                    value="Register"
                />
                <div className="px-2 flex items-center justify-center space-x-2">
                    <hr className="flex-grow border-t-2 border-gray-300" />
                    <span className="px-1 pb-1">or</span>
                    <hr className="flex-grow border-t-2 border-gray-300" />
                </div>
            </form>
            <p className="inline-block">
                already have account ?{' '}
                <span
                    onClick={() => {
                        navigate('/login'); 
                    }}
                    className="text-black font-medium cursor-pointer"
                >
                    Log In
                </span>
            </p>
        </div>
    );
}

export default SignupForm;
