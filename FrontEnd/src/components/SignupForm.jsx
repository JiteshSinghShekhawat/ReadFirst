import React, { useState } from 'react'

function SignupForm({setFlag}) {
    const [userName,setUserName] = useState('*'); 
    const [email,setEmail] = useState('*'); 
    const [fullName,setFullName] = useState('*'); 
    const [password,setPassword] = useState('*'); 
    const [cnfPassword,setCnfPassword] = useState('*'); 

    const onSubmit = (e)=>{
        e.preventDefault(); 
        console.log(userName,email,fullName,password,cnfPassword); 
    }   
    return (
    <div className="w-full text-center">  
    {/* userName, email, password, fullName */}
            <img className="mx-auto" src="/Logo.png" alt="Logo" />
            <form onSubmit={onSubmit} className="w-2/3 mx-auto my-2 text-left">
                <h2 className="text-lg font-medium pl-1">Email</h2>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="bg-gray-200 w-full rounded-lg p-2 my-1" name="" id="" />
                <h2 className="text-lg font-medium pl-1">User Name</h2>
                <input onChange={(e)=>{setUserName(e.target.value)}} className="bg-gray-200 w-full rounded-lg p-2 my-1" type="text" name="" id="" />
                <h2 className="text-lg font-medium pl-1">Full Name</h2>
                <input onChange={(e)=>{setFullName(e.target.value)}} className="bg-gray-200 w-full rounded-lg p-2 my-1" type="text" name="" id="" />
                <h2 className="text-lg font-medium pl-1">Password</h2>
                <input onChange={(e)=>{setPassword(e.target.value)}} className="bg-gray-200 w-full rounded-lg p-2 my-1" type="password" name="" id="" />
                <h2 className="text-lg font-medium pl-1">Confirm Password</h2>
                <input onChange={(e)=>{setCnfPassword(e.target.value)}} className="bg-gray-200 w-full rounded-lg p-2 my-1" type="password" name="" id="" />
                <input className="cursor-pointer w-full font-medium my-6 rounded-lg p-2 bg-black text-white" type="submit" value="Register" /> 
                <div className="px-2 flex items-center justify-center space-x-2">
                    <hr className="flex-grow border-t-2 border-gray-300"/>
                    <span className="px-1 pb-1">or</span>
                    <hr className="flex-grow border-t-2 border-gray-300"/>
                </div>
            </form> 
            <p className="inline-block">already have account ? <span onClick={()=>{setFlag(true)}} className="text-black font-medium cursor-pointer">Sign In</span></p>
        </div>
    )
}

export default SignupForm
