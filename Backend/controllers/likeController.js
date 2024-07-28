import { User } from '../models/users.models.js';
import { Post } from '../models/post.model.js';
import { Comment } from '../models/comment.model.js';
import { Like } from '../models/like.model.js';

export const addLike = async (req, res) => {
    try {
        const { postId, commentId } = req.body;
        const userId = req.user.id;

        if (!postId && !commentId) {
            return res.status(400).json({
                message: 'Please Like Valid Entity',
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        if (postId) {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(400).json({ message: 'Invalid post ID.' });
            }
        }
        if (commentId) {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(400).json({ message: 'Invalid comment ID.' });
            }
        }

        const existingLike = await Like.findOne({
            UserId: userId,
            PostId: postId,
            CommentId: commentId,
        });
        if (existingLike) {
            return res
                .status(400)
                .json({
                    message: 'You have already liked this post or comment.',
                });
        }

        const newLike = new Like({
            UserId: userId,
            PostId: postId,
            CommentId: commentId,
        });
        await newLike.save();

        if (postId) {
            await Post.findByIdAndUpdate(postId, { $inc: { LikeCount: 1 } });
        } else if (commentId) {
            await Comment.findByIdAndUpdate(commentId, {
                $inc: { LikeCount: 1 },
            });
        }
        res.status(200).json({ message: 'Like updated Successfully' });
    } catch (e) {
        console.log(`Error while adding like ${e}`);
        res.sendStatus(400);
    }
};

export const removeLike = async (req, res) => {
    try {
        const { postId, commentId } = req.body;
        const userId = req.user.id;

        if (!userId || (!postId && !commentId)) {
            return res.status(400).json({
                message: 'Please Select Valid Entity',
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        if (postId) {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(400).json({ message: 'Invalid post ID.' });
            }
        } else if (commentId) {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(400).json({ message: 'Invalid comment ID.' });
            }
        }

        const like = await Like.findOneAndDelete({
            UserId: userId,
            PostId: postId,
            CommentId: commentId,
        });
        if (!like) {
            return res.status(400).json({ message: 'Like not found.' });
        }

        if (postId) {
            await Post.findByIdAndUpdate(postId, { $inc: { LikeCount: -1 } });
        } else if (commentId) {
            await Comment.findByIdAndUpdate(commentId, {
                $inc: { LikeCount: -1 },
            });
        }

        res.status(200).json({ message: 'Like removed successfully.' });
    } catch (e) {
        console.log(`Error while removing like ${e}`);
        res.sendStatus(400);
    }
};
