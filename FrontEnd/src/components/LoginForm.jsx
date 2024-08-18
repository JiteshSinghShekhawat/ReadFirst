import React, { useState } from 'react';
import Notification from './Notification';

// use form hook
// use transition hook

const LoginForm = ({ setFlag }) => {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(''); 

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!input || !password) {
            setTimeout(() => {
                setNotification('Please fill in all fields.');
            }, 10);
            return;
        }

        try{
            const response = await fetch('http://localhost:8000/login',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json', 
                },
                body: JSON.stringify({
                    input, 
                    password
                }),
            }); 

            const data = await response.json(); 

            setNotification(''); 
            setTimeout(()=>{
                setNotification(data.message); 
            },10); 
        }catch(e){
            console.log(e); 
        }
    };

    return (
        <div className="w-full text-center">
            <img className="mx-auto" src="/Logo.png" alt="Logo" />
            <form onSubmit={onSubmit} className="w-2/3 mx-auto my-2 text-left">
                <h1 className="text-xl font-medium p-2">Email or UserName</h1>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-200"
                    type="text"
                    name="email"
                    placeholder="shekhawat@gmail.com"
                    id=""
                />
                <h1 className="my-2 text-xl font-medium p-2">Password</h1>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded-lg bg-gray-200"
                    type="password"
                    name="password"
                    placeholder="********"
                    id=""
                />
                <input
                    className="cursor-pointer w-full font-medium my-6 rounded-lg p-2 bg-black text-white"
                    type="submit"
                    value="Login"
                />
                <div className="px-2 flex items-center justify-center space-x-2">
                    <hr className="flex-grow border-t-2 border-gray-300" />
                    <span className="px-1 pb-1">or</span>
                    <hr className="flex-grow border-t-2 border-gray-300" />
                </div>
            </form>
            <p className="inline-block">
                dont' have an account ?{' '}
                <span
                    onClick={() => {
                        setFlag(false);
                    }}
                    className="text-black font-medium cursor-pointer"
                >
                    Register
                </span>
            </p>
            {notification && (
                <Notification
                message={notification}
                onClose={() => setNotification('')}
                />
            )}
        </div>
    );
};

export default LoginForm;
