const express = require('express');
const Router = express.Router();
const { logIn, signUp } = require('../CONTROLLER/auth');

Router.get('/sign-up', signUp);
Router.get('/log-in', logIn);

module.exports = Router;