import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostListCol({ posts, idx }) {
    const navigate = useNavigate();
    //content , likeCount, Title , userName
    if (!posts) return <div>Loading</div>;

    const ClickOn = () => {
        navigate(`/post/${posts._id}`);
    };

    return (
        <div
            onClick={ClickOn}
            className="cursor-pointer w-2/3 px-3 py-4 border-b-2 border-gray-200 m-5 ml-16 flex-1"
        >
            <div className="font-thin text-sm p-1 text-right">
                By {posts.userName}
            </div>
            <div className="font-extrabold text-2xl">{posts.Title}</div>
            <div className="font-semibold my-3">
                {posts.Content.substring(0, 60) + '...'}
            </div>
            <div className="flex justify-start items-center gap-1">
                <div>👏</div>
                <div>{posts.LikeCount}</div>
            </div>
        </div>
    );
}

export default PostListCol;
