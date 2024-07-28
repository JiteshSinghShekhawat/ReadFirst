import mongoose, { Schema } from 'mongoose';

const LikeSchema = new Schema(
    {
        UserId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        PostId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            default: null,
        },
        CommentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
    },
    { timestamps: true }
);

LikeSchema.pre('validate', function (next) {
    if (this.PostId && this.CommentId) {
        return next(
            new Error('Cannot like both a post and a comment at the same time')
        );
    }
    if (!this.PostId && !this.CommentId) {
        return next(new Error('Must like either a post or a comment'));
    }
    next();
});

export const Like = mongoose.model('Like', LikeSchema);
