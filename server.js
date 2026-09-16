const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
const connectDB = require('./DB/dbConnection');
connectDB();

app.get('/', (req,res)=>{
    res.send('This is the Homepage. Your app is running');
})

app.listen(PORT, ()=>{
    console.log('App is running');
})
