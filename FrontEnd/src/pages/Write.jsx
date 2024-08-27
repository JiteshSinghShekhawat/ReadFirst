import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

function Write() {
    const [content, setContent] = useState('');
    const [title,setTitle] = useState(''); 
    const token = localStorage.getItem('jwt'); 
    const navigate = useNavigate(); 

    const handleInput = (e) => {
        setTitle(e.target.value);
        adjustTextareaHeight(e.target);
    };
    const handleInput2 = (e)=>{
      setContent(e.target.value); 
      adjustTextareaHeight(e.target); 
    }
    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto'; 
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const blogPost = async()=>{
      try{
        console.log(title);
        console.log(content); 
        const response = await fetch(`${import.meta.env.VITE_API_URI}/posts`,{
            method : 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: content
            }),
        }); 
 
        const data = await response.json(); 
        console.log(data); 

        navigate('/'); 

      }catch(e){
        console.log(e); 
      }
    }

    return (
        <div>
            <NavBar />
            <div className="px-10 break-words">
                <div className="w-5/6 outline-none">
                    <textarea
                        className="text-5xl font-bold overflow-hidden resize-none outline-none w-full"
                        name=""
                        placeholder="Title"
                        value={title}
                        onInput={handleInput}
                        autoComplete="off"
                        spellCheck="false"
                        style={{ height: 'auto' }}
                    ></textarea>
                    <textarea
                        className="text-2xl font-bold overflow-hidden resize-none outline-none w-full"
                        name=""
                        placeholder="Tell Your Story... "
                        value={content}
                        onInput={handleInput2}
                        autoComplete="off"
                        spellCheck="false"
                        style={{ height: 'auto' }}
                    ></textarea>
                </div>
                <div onClick={blogPost} className='cursor-pointer fixed h-12 w-28 bg-green-500 rounded-full right-3 bottom-1/2 text-white font-bold text-lg flex justify-center items-center'><div>Publish</div></div>
            </div>
        </div>
    );
}

export default Write;
