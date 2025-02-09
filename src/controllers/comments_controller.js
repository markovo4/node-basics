const Comment = require('../models/Comments_model');
const jwt = require('jsonwebtoken');


const getComments = async (req, res)=>{
    try{
        const comments = await Comment.find();
        res.status(200).json({comments, message: 'Comments retrieved successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}
const createComment = async (req, res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY);

        const {id} = req.params;
        const {description} = req.body;

        const newComment =  new Comment({description, userId: decoded.id, postId: id})
        await newComment.save();
        res.status(200).json({newComment, message: 'New Comment created successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

const getCommentsByPost = async (req, res)=>{
    try{
        const {postId} = req.params;

        const comments = await Comment.find({postId})

        res.status(200).json({comments, message: 'Comments retrieved successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

const updateCommentById = async (req, res)=>{
    try{
        const {commentId} = req.params;

        const comment = await Comment.findByIdAndUpdate({id: commentId}, req.body, {new: true})
        res.status(200).json({comment, message: 'Comment updated successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

const deleteCommentById = async (req, res)=>{
    try{
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)
        if(!deletedComment) return res.status(404).json({massage: 'Comment was not found'});
        res.status(200).json({deletedComment, message: 'Comment deleted successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getComments, createComment, getCommentsByPost, updateCommentById, deleteCommentById}