const mongoose = require('mongoose');
const URL = process.env.URL

const connectDB=()=>{
    mongoose.connect(URL).then(()=>{
        console.log('DB has been connected!')
    }).catch(err=>{
        console.log('Error in DB connection', err)
    })
};

module.exports = connectDB;