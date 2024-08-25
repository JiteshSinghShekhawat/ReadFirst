import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../components/NavBar";

const Post = () =>{
    const { id } = useParams();
    const jwt = localStorage.getItem('jwt'); 
    const apiCall = async() =>{
        try{
            const response = await fetch(
                `${import.meta.env.VITE_API_URI}/check`,
                {   
                    method: 'GET',

                }
            );
            const data = await response.json(); 

            console.log(data);
        }catch(e){
            console.log(`Error while Fetching the detailed post ${e}`); 
        }
    }
    
    useEffect(()=>{
        apiCall(); 
    },[])
    return (
        <div>
            <NavBar logo={true}/>
        </div>
    ); 
}

export default Post; 