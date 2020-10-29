const mongoose = require('mongoose');

//Create new mongoose schema for users
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    token:{
        type : String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;