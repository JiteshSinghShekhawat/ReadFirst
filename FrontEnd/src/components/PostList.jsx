import React, { useEffect, useState } from 'react';
import PostListCol from './PostListCol';

function PostList() {
    const jwt = localStorage.getItem('jwt');
    const [posts, setPosts] = useState(null);

    useEffect(() => ApiBlog, []);
    const ApiBlog = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URI}/posts/`,
                {
                    method: 'GET',
                }
            );

            const data = await response.json();
            setPosts(data.docs);
        } catch (e) {
            console.log(`Error while Fetching Post list ${e}`);
        }
    };
    if (!posts) return <div></div>;
    return (
        <div className=" flex-col">
            <div className="w-2/3 px-3 py-4 border-b-2 border-gray-200 m-5 ml-16 flex-1"></div>
            {posts.map((post, idx) => (
                <PostListCol posts={posts[idx]} key={idx} />
            ))}
        </div>
    );
}

export default PostList;
