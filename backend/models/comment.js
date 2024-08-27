import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    user:String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Updated to use Date.now without parentheses
    }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;