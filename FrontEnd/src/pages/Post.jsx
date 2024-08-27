import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PostContainer from '../components/PostContainer';

const Post = () => {
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    const jwt = localStorage.getItem('jwt');
    const [post, setPost] = useState(null);

    const toggleRefresh = () => {
        setRefresh((prev) => !prev);
    };

    useEffect(() => {
        apiCall();
    }, [refresh]);

    const apiCall = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URI}/posts/${id}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();

            setPost(data.post);
        } catch (e) {
            console.log(`Error while Fetching the detailed post ${e}`);
        }
    };

    useEffect(() => {
        apiCall();
    }, []);
    if (!post) return <div>Loading... </div>;
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar logo={true} search={false} />
            <div className="flex-1 flex flex-col items-center">
                <PostContainer post={post} onLike={toggleRefresh} />
            </div>
        </div>
    );
};

export default Post;
