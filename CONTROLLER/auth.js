const mongoose = require('mongoose');
// const Auth = require('../MODEL/auth');

const signUp=(req,res)=>{
    res.send('Sign Up');
}

const logIn=(req,res)=>{
    res.send('Log In');
}

module.exports = { signUp, logIn };