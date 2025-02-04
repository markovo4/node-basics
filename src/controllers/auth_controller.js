require('dotenv').config();
const User = require('../models/User_model');
const jwt = require('jsonwebtoken');


exports.register = async (req, res)=>{
    try{
        const {userName, email, password} = req.body;
        if(!userName || !email || !password) {
            return res.status(400).json({message: 'Please input name, email and password!'})
        }

        const existingUser = await User.findOne({ $or: [{email}, {userName}] });
        if(existingUser){
            return res.status(409).json({message: 'User with such credentials already exists'});
        }

        const user = new User({userName, email, password});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        return res.status(201).json({ token, user: {id: user._id, userName, email}});
    } catch(error) {
        console.error(error);
        return res.status(500).json({message: 'Server error'});
    }
}

exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'Please input email and password!'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User was not found!'})
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Wrong email or password!'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        return res.status(200).json({token, user: {id: user._id, userName: user.userName, email: user.email}});

    } catch(error){

    }
}