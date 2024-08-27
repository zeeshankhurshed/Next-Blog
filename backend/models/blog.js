import mongoose from "mongoose";


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
            required:true,
    },
    description:String,
    content: {
        type: mongoose.Schema.Types.Mixed, // Allow mixed types to store EditorJS output
        required: true, // If content is mandatory
    },
    coverImage:String,
    category:String,
    location:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Blog=mongoose.model('Blog',blogSchema);

export default Blog;