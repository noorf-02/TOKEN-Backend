const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT
const connectDB = require('./DB/dbConnection');
connectDB();
const Router = require('./VIEW/auth');

app.use(express.json());
app.use(Router);

app.get('/', (req,res)=>{
    res.send(`This is the Homepage. Your app is running on ${PORT}`);
})

app.all('/*path', (req,res)=>{
    res.send(`Sorry! This path does not exist`)
})

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
})
