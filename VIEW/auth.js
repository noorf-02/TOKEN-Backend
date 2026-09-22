const express = require('express');
const Router = express.Router();
const { logIn, signUp, tokenDecoded } = require('../CONTROLLER/auth');

Router.post('/sign-up', signUp);
Router.post('/log-in', logIn);
Router.get('/get-token', tokenDecoded);

module.exports = Router;