const Post = require('../models/Post_model');
const jwt = require('jsonwebtoken');
const getPosts = async (req, res)=>{
    try{
        const post = await Post.find({userId: req.userId})
        res.status(200).json({post, message: 'Posts retrieved successfully!'})
    } catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}


const createPost = async (req, res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY);
        const {title, description} = req.body;
        const post = new Post({title, description, userId: decoded.id})
        await post.save();
        res.status(201).json({post, message: 'New post created successfully!'});
    } catch(error){
        console.error(`${error.message}`);
        res.status(400).json({ message: error.message });
    }
}

const getPostById = async (req, res)=>{
    try{
        const id = req.params;
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch(error){
        console.error(`${error.message}`);
        res.status(400).json({ message: error.message });
    }
}

const updatePost = async (req, res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedPost) return res.status(404).json({massage: 'Post was not found'});
        res.status(200).json({updatedPost, message: 'Post was updated successfully'});

    } catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}


const deletePost = async (req, res)=>{
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost) return res.status(404).json({massage: 'Post was not found'});
        res.status(200).json({deletedPost, message: 'Post was deleted successfully'});

    } catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {getPosts, createPost, getPostById, updatePost, deletePost}