const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    key:{
        type : String,
        required : false
    }
})

const key = mongoose.model('key', keySchema);

module.exports = {key};