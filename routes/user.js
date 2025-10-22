const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Customer sign up
router.post('/signup', UserController.customerSignUp);

// Customer sign in
router.post('/signin', UserController.customerSignIn);
