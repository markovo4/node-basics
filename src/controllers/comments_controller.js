const Comment = require('../models/Comments_model');
const jwt = require('jsonwebtoken');


const getComments = async (req, res)=>{
    try{
        const {postId} = req.params;
        const comments = await Comment.find({postId}).populate('userId', 'username email');
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

        const {postId} = req.params;
        const {comment} = req.body;

        const newComment = new Comment.create({comment, userId: decoded.id, postId})
        res.status(200).json({newComment, message: 'New Comment created successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

const getCommentById = async (req, res)=>{
    try{
        const {postId} = req.params;

        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.decode(token, process.env.JWT_SECRET_KEY);

        const {postId} = req.params;
        const {comment} = req.body;

        const newComment = new Comment.create({comment, userId: decoded.id, postId})
        res.status(200).json({newComment, message: 'New Comment created successfully!'})
    }catch(error){
        console.error(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
}
