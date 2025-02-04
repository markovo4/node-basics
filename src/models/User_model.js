const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true});

userSchema.pre('save', async (next) =>{
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(error){
        next(error);
    }
})



userSchema.methods.comparePassword = async function(examplePassword){
    return bcrypt.compare(examplePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);