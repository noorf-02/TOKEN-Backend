const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema ({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;