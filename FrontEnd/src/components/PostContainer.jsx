import React from 'react';

function PostContainer({ post, onLike }) {
    const token = localStorage.getItem('jwt');
    if (!post) return <div>Loading.. </div>;
    console.log(post);

    const LikeRequest = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URI}/posts/like`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: post._id,
                    }),
                }
            );

            const data = await response.json();
        } catch (e) {
            console.log(`Error while Sending Like Request Api ${e}`);
        }

        onLike();
    };

    return (
        <div className="w-1/2 h-full flex-1 p-8">
            <div className="font-bold text-3xl w-2/3">{post.Title}</div>
            <div className="my-5 px-2 flex gap-3 items-center font-semibold">
                <div className="rounded-full w-8 h-8 bg-gray-200"></div>
                <div>{post.Author.userName}</div>
            </div>
            <div className="border-y-2 border-gray-200">
                <div
                    onClick={LikeRequest}
                    className="cursor-pointer inline-block"
                >
                    👏 {post.LikeCount}
                </div>
            </div>
            <div className="my-10 font-semibold text-lg leading-7 tracking-wider">
                {post.Content}
            </div>

            <div className="border-y-2 bg-gray-200"></div>
        </div>
    );
}

export default PostContainer;
