import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

export const createBlog = async (req, res) => {
    try {
        // console.log('Request body:', req.body); // Log to see all the incoming fields

        const { title, content, coverImage, metaDescription, category, rating, author } = req.body;

        const newPost = new Blog({
            title,
            content: JSON.parse(content), // Parse the content data
            coverImage, // Directly use coverImage from req.body
            description: metaDescription,
            category,
            rating: parseFloat(rating),
            author,
        });

        await newPost.save();
        res.status(201).json({
            message: "Post created Successfully",
            post: newPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};




export const getAllBlog = async (req, res) => {
    try {
        const { search, category, location } = req.query;  
        // console.log('Search Query:', search);
        // console.log('Category:', category);
        // console.log('Location:', location);

        let query = {};

        // If search query is present, add to the query
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } },
                ],
            };
        }

        // If category is present, add to the query
        if (category) {
            query = {
                ...query,
                category: { $regex: category, $options: 'i' }
            };
        }

        // If location is present, add to the query
        if (location) {
            query = {
                ...query,
                location: { $regex: location, $options: 'i' }
            };
        }

        // Execute the query
        const posts = await Blog.find(query).populate('author','email').sort({createdAt:-1});

        res.status(200).json(posts);
    } catch (error) {
        console.log("Error retrieving posts:", error);
        res.status(500).json({ message: "Error retrieving posts" });
    }
};

export const getBlog=async(req,res)=>{
    try {
        const postId=req.params.id;
        const post =await Blog.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        const comments=await Comment.find({postId:postId}).populate('user','username email')
        res.status(200).json({
            message:"Post retrieved Successfully",
            post:post,
            comments:comments
            
        })
    } catch (error) {
        console.error('Error fetching single post:',error);
        res.status(500).json({message:"Error fetching single post"});
    }
}


export const updateBlog = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatePost = await Blog.findByIdAndUpdate(
            postId,
            { ...req.body },
            { new: true } // This returns the updated document
        );

        if (!updatePost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: updatePost,
        });
    } catch (error) {
        console.log('Error updating post:', error);
        res.status(500).json({ message: "Error updating post" });
    }
};

export const deleteBlog=async(req,res)=>{
    try {
        const postId=req.params.id;
        const post =await Blog.findByIdAndDelete(postId);

        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        await Comment.deleteMany({postId:postId})
        res.status(200).json({
            message:"Post deleted Successfully",
            post:post,
        });
    } catch (error) {
        console.log('Error deleting post:', error);
        res.status(500).json({ message: "Error deleting post" });
    }
}

export const relatedBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            res.status(404).json({message:"Post id is not required"})
        }
        const blog=await Blog.findById(id);
        if(!blog){
            res.status(404).json({message:"Post is not found"})
        }

        const titleRegex=new RegExp(blog.title.split('').join('|'),'i');

        const relatedQuery={
            _id:{$ne:id},// exclude the current blog by id
            title:{$regex:titleRegex}
        }
        const relatedPost =await Blog.find(relatedQuery);
        res.status(200).json({message:"Related post found!", relatedPost})
    } catch (error) {
        console.log('Error fetching related post:', error);
        res.status(500).json({ message: "Error fetching related post" });
    }
}